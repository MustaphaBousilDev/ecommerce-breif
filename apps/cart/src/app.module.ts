import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './product/products.module';
import { CartModule } from './cart/cart.module';
import { CartItemsModule } from './cart-items/cart-items.module';
@Module({
  imports: [
    // MongooseModule.forRoot(process.env.DATABASE_URL),
    ProductsModule,
    CartModule,
    CartItemsModule,
  ],
})
export class AppModule {}
