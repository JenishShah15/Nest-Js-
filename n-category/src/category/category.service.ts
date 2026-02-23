import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { TreeRepository } from 'typeorm';
import { MoveCategoryDto } from './dto/move-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: TreeRepository<Category>,
  ) {}

  async create(dto: CreateCategoryDto) {
    console.log(dto);
    const category = new Category();

    category.name = dto.name || 'unnamed category';
    if (dto.parentId) {
      const parent = await this.categoryRepo.findOneBy({ id: dto.parentId });
      if (!parent) {
        throw new NotFoundException('Parent category not found');
      }
      category.parent = parent;
    }
    console.log(category);
    return this.categoryRepo.save(category);
  }

  async findAllTree() {
    const tree = await this.categoryRepo.findTrees();
    return tree;
  }

  async findSubTree(id: number) {
    const category = await this.categoryRepo.findOneBy({ id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.categoryRepo.findDescendantsTree(category);
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    category.name = dto.name;
    return await this.categoryRepo.save(category);
  }

  async move(id: number, dto: MoveCategoryDto) {
    const category = await this.categoryRepo.findOneBy({ id });
    const newParent = await this.categoryRepo.findOneBy({
      id: dto.newParentId,
    });
    if (!category || !newParent) {
      throw new NotFoundException('Category or new parent not found');
    }
    category.parent = newParent;
    return this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return await this.categoryRepo.remove(category);
  }
}
