import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
// import { MongooseModule } from '@nestjs/mongoose';
import { CartItem, CartItemSchema } from './entities/cart-item.entity';
import { Cart, CartSchema } from '../cart/entities/cart.entity';
import { Product, ProductSchema } from '../product/entities/product.entity';
import { DatabaseModuleCart } from 'y/shared';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    DatabaseModuleCart,
    DatabaseModuleCart.forFeature([
      { name: CartItem.name, schema: CartItemSchema },
      { name: Cart.name, schema: CartSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI_CARTSHOPPING: Joi.string().required(),
      }),
    }),
  ],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
