import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  async getProductById(productId: string): Promise<Product> {
    return await this.productModel.findById(productId).exec();
  }

  // async findAll(): Promise<Product[]> {
  //   return await this.productModel.find().exec();
  // }

  // async findOne(id: string): Promise<Product> {
  //   const product = await this.productModel.findById(id).exec();
  //   if (!product) {
  //     throw new NotFoundException(`Product with ID ${id} not found`);
  //   }
  //   return product;
  // }

  // async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
  //   const updatedProduct = await this.productModel
  //     .findByIdAndUpdate(id, updateProductDto, { new: true })
  //     .exec();
  //   if (!updatedProduct) {
  //     throw new NotFoundException(`Product with ID ${id} not found`);
  //   }
  //   return updatedProduct;
  // }

  // async remove(id: string): Promise<void> {
  //   const result = await this.productModel.deleteOne({ _id: id }).exec();
  //   if (result.deletedCount === 0) {
  //     throw new NotFoundException(`Product with ID ${id} not found`);
  //   }
  // }
}
