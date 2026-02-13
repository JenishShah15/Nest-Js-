import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    console.log(createItemDto);
    const { listing, ...rest } = createItemDto;
    const listingObj = this.entityManager.create(Listing, {
      ...listing,
      rating: 0,
    });
    const item = this.entityManager.create(Item, {
      ...rest,
      comments: [],
      listing: listingObj,
    });
    await this.entityManager.save(item);
    return item;
  }

  async findAll() {
    return await this.itemsRepository.find({
      relations: {
        listing: true,
        comments: true,
      },
    });
  }

  async findOne(id: number) {
    const item = await this.itemsRepository.findOne({
      where: { id },
      relations: { listing: true, comments: true },
    });
    if (!item) {
      return { statusbar: 404, message: 'Item not found' };
    }
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    console.log(updateItemDto);
    const item = await this.itemsRepository.findOne({
      where: { id },
      relations: {
        listing: true,
        comments: true,
      },
    });

    console.log(item);
    if (!item) {
      return null;
    }

    const comments = updateItemDto.comments.map((createcommentdto) =>
      this.entityManager.create(Comment, { content: createcommentdto.content }),
    );
    item.public = updateItemDto.public;
    // const comments = updateItemDto.comments.map(
    //   (createCommentDto) => new Comment({ content: createCommentDto.content }),
    // );
    item.comments = [...item.comments, ...comments];

    // item.comments = comments;
    await this.itemsRepository.save(item);
    return item;
  }

  async remove(id: number) {
    return await this.itemsRepository.delete({ id });
  }
}
