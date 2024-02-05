import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart, CartSchema } from './cart.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    // Other required modules if any
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService], // If the CartService needs to be used in other modules
})
export class CartModule {}
