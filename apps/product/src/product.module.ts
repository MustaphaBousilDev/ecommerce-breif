import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    PrismaModule,
    CategoriesModule,
    ProductsModule,
    UsersModule,
    CloudinaryModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class ProductModule {}
