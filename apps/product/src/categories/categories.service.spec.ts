import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseCategoryDto } from './dto/response-categoty.dto';
import { NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, PrismaService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prismaService.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories = [
        {
          id: 1,
          name: 'Category 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Category 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest
        .spyOn(prismaService.categories, 'findMany')
        .mockResolvedValue(categories);

      const result = await service.findAll();

      expect(result).toEqual(
        categories.map((category) => new ResponseCategoryDto(category)),
      );
    });
  });
  describe('findOne', () => {
    it('should return a category when given a valid id', async () => {
      // Arrange
      const id = 1;
      const category = {
        id: 1,
        name: 'Category 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(prismaService.categories, 'findUnique')
        .mockResolvedValue(category);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(result).toEqual(new ResponseCategoryDto(category));
    });

    it('should throw NotFoundException when given an invalid id', async () => {
      // Arrange
      const id = 999;
      jest
        .spyOn(prismaService.categories, 'findUnique')
        .mockResolvedValue(null);

      // Act & Assert
      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new category', async () => {
      // Arrange
      const createCategoryDto: CreateCategoryDto = {
        name: 'New Category',
      };
      const createdCategory = {
        id: 1,
        name: 'New Category',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(prismaService.categories, 'create')
        .mockResolvedValue(createdCategory);

      // Act
      const result = await service.create(createCategoryDto);

      // Assert
      expect(result).toEqual({
        message: 'Category created successfully',
        data: createdCategory,
      });
    });
  });

  describe('update', () => {
    it('should update a category when given a valid id and updateCategoryDto', async () => {
      // Arrange
      const id = 1;
      const updateCategoryDto: UpdateCategoryDto = {
        name: 'Updated Category',
      };
      const category = {
        id: 1,
        name: 'Category 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const resultOfUpdate = {
        id: 1,
        name: 'Updated Category',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(prismaService.categories, 'findUnique')
        .mockResolvedValue(category);

      jest.spyOn(prismaService.categories, 'update').mockResolvedValue({
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: updateCategoryDto.name,
      });

      // Act
      const result = await service.update(id, updateCategoryDto);

      // Assert
      expect(result).toEqual({
        message: 'Category updated successfully',
        data: resultOfUpdate,
      });
    });

    it('should throw NotFoundException when given an invalid id', async () => {
      // Arrange
      const id = 999;
      const updateCategoryDto: UpdateCategoryDto = {
        name: 'Updated Category',
      };
      jest
        .spyOn(prismaService.categories, 'findUnique')
        .mockResolvedValue(null);

      // Act & Assert
      await expect(service.update(id, updateCategoryDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
