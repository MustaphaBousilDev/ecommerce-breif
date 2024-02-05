import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseProductDto } from './dto/response-product.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { extname } from 'path';
import { Multer } from 'multer';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    // Check if the specified category exists
    const category = await this.prisma.categories.findUnique({
      where: { id: createProductDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category does not exist');
    }

    const url = await this.createImage(file);
    console.log(url);

    const product = {
      name: createProductDto.name,
      price: createProductDto.price,
      description: createProductDto.description,
      image: url,
      quantity: createProductDto.quantity,
      categoryId: createProductDto.categoryId,
      userId: 2,
    };

    return await this.prisma.products.create({
      data: product,
    });
  }
  async createImage(file: Express.Multer.File) {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    const fileExtension = extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException(
        'Invalid file type. Only image files are allowed.',
      );
    }

    const result = await this.cloudinaryService.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    console.log(result);
    return result.url;
  }

  async findAll(): Promise<ResponseProductDto[]> {
    const productsWithDetails = await this.prisma.products.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return productsWithDetails.map(
      (product) => new ResponseProductDto(product),
    );
  }

  async findOne(id: number): Promise<ResponseProductDto> {
    const productWithDetails = await this.prisma.products.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!productWithDetails) {
      throw new NotFoundException('Product not found');
    }

    return new ResponseProductDto(productWithDetails);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.products.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const data = await this.prisma.products.update({
      where: { id },
      data: updateProductDto,
    });
    return {
      message: 'Product updated successfully',
      data,
    };
  }

  async remove(id: number) {
    const product = await this.prisma.products.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.prisma.products.delete({
      where: { id },
    });
    return {
      message: 'Product deleted successfully',
    };
  }
}
