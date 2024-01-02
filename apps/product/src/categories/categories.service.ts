import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseCategoryDto } from './dto/response-categoty.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const data = await this.prisma.categories.create({
      data: createCategoryDto,
    });
    return {
      message: 'Category created successfully',
      data,
    };
  }

  async findAll(): Promise<ResponseCategoryDto[]> {
    const categories = await this.prisma.categories.findMany();
    return categories.map((category) => new ResponseCategoryDto(category));
  }

  async findOne(id: number): Promise<ResponseCategoryDto> {
    const category = await this.prisma.categories.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException();
    }
    return new ResponseCategoryDto(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.categories.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException();
    }

    const data = await this.prisma.categories.update({
      where: { id },
      data: updateCategoryDto,
    });
    return {
      message: 'Category updated successfully',
      data,
    };
  }

  async remove(id: number) {
    const category = await this.prisma.categories.findUnique({
      where: { id },
      // include: {
      //   products: true,
      // },
    });
    if (!category) {
      throw new NotFoundException();
    }

    // await this.prisma.products.deleteMany({
    //   where: {
    //     categoryId: id,
    //   },
    // });

    await this.prisma.categories.delete({
      where: { id },
    });

    return {
      message: 'Category and associated products deleted successfully',
    };
  }
}
