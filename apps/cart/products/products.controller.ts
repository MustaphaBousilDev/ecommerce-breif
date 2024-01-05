import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Res,
  NotFoundException,
  Query,
  Put,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async create(@Res() res, @Body() createProductDto: CreateProductDto) {
    const newProduct = await this.productService.create(createProductDto);
    return res.json({
      message: 'Product has been submitted successfully!',
      product: newProduct,
    });
  }

  // @Get()
  // @HttpCode(200)
  // async getAllProducts(@Res() res) {
  //   const products = await this.productService.findAll();
  //   return res.json({
  //     message: 'All products',
  //     products: products,
  //   });
  // }

  // @Get(':productId')
  // @HttpCode(200)
  // async findOneProduct(
  //   @Res() res,
  //   @Param('productId') productId: string,
  // ): Promise<any> {
  //   const product = await this.productService.findOne(productId);
  //   if (!product) {
  //     throw new NotFoundException('Product does not exist!');
  //   }
  //   return res.json({
  //     message: 'Product details',
  //     product: product,
  //   });
  // }

  //   @Put(':productID')
  //   @HttpCode(200)
  //   @UsePipes(ValidationPipe)
  //   async updateProduct(
  //     @Res() res,
  //     @Param('productID') productID,
  //     @Body() updateProductDto: UpdateProductDto,
  //   ): Promise<any> {
  //     const updatedProduct = await this.productService.update(
  //       productID,
  //       updateProductDto,
  //     );
  //     if (!updatedProduct) {
  //       throw new NotFoundException('Product does not exist!');
  //     }
  //     return res.json({
  //       message: 'Product has been successfully updated',
  //       product: updatedProduct,
  //     });
  //   }

  //   @Delete(':ProductId')
  //   @HttpCode(200)
  //   async delete(
  //     @Res() res,
  //     @Param('ProductId') ProductId: string,
  //   ): Promise<any> {
  //     const product = await this.productService.findOne(ProductId);

  //     if (!product) {
  //       throw new NotFoundException('product does not exist!');
  //     }
  //     await this.productService.softDelete(ProductId);
  //     return res.json({
  //       message: 'Product has been trashed successfully',
  //       product: product,
  //     });
  //   }
}
