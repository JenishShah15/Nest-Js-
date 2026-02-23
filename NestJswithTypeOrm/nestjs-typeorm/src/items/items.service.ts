import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { createTagDto } from './dto/create-tag-dto';
import { DataSource } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
    private readonly dataSource: DataSource,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const { listing, ...rest } = createItemDto;
    const listingObj = this.entityManager.create(Listing, {
      ...listing,
      rating: 0,
    });
    console.log(createItemDto.tag);

    const tags = createItemDto.tag.map((createTagDto) => {
      return this.entityManager.create(Tag, createTagDto);
    });
    const item = this.entityManager.create(Item, {
      ...rest,
      comments: [],
      listing: listingObj,
      tags: tags,
    });
    await this.entityManager.save(item);
    return item;
  }

  async findAll() {
    return await this.itemsRepository.find({
      relations: {
        listing: true,
        comments: true,
        tags: true,
      },
    });
  }

  async findOne(id: number) {
    const item = await this.itemsRepository.findOne({
      where: { id },
      relations: { listing: true, comments: true, tags: true },
    });
    if (!item) {
      return { statusbar: 404, message: 'Item not found' };
    }
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    return await this.dataSource.transaction(async (entityManager) => {
      const item = await entityManager.findOne(Item, {
        where: { id },
        relations: {
          listing: true,
          comments: true,
          tags: true,
        },
      });

      if (!item) return null;

      // create comments INSIDE transaction
      const comments = updateItemDto.comments.map((dto) =>
        entityManager.create(Comment, {
          content: dto.content,
        }),
      );

      item.public = updateItemDto.public;

      // append comments
      item.comments = [...item.comments, ...comments];

      // SAVE using transaction manager
      await entityManager.save(Item, item);

      // create tag
      const tag = entityManager.create(Tag, {
        content: `${Math.random()}`,
      });

      await entityManager.save(Tag, tag);

      // test rollback
      // throw new Error('Intentional rollback test');
    });
  }

  async remove(id: number) {
    return await this.itemsRepository.delete({ id });
  }
}
