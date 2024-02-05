import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Post()
  async create(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productService.create(productData);
  }
  

  @Put(':id')
  async update(@Param('id') id: string, @Body() productData: Partial<Product>): Promise<Product> {
    return this.productService.update(id, productData);
  }

//   @Delete(':id')
//   async delete(@Param('id') id: string): Promise<Product> {
//     return this.productService.delete(id);
//   }
}