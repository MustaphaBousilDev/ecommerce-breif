// product.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const createdProduct = new this.productModel(productData);
    return createdProduct.save();
  }

  async update(id: string, productData: Partial<Product>): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productData, { new: true }).exec();
  }

//   async delete(id: string): Promise<Product | null> {
//     const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
//     return deletedProduct ? deletedProduct.toObject() as Product : null;
//   }
}
