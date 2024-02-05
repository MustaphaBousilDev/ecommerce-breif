import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './order.model';
import { UserModule } from './user/user.module';
import { ProductModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { User, UserSchema } from './user/user.model';
import { Product, ProductSchema } from './products/product.model';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://salma-gader:1234567890@cluster0.4uq99aa.mongodb.net/micro_services?retryWrites=true&w=majority"),
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      {name:User.name, schema: UserSchema},
      {name:Product.name, schema: ProductSchema}
  ]),
    UserModule,
    ProductModule,
    CartModule,
  ],
  controllers: [OrderController],
  providers: [OrderService], 
})
export class OrderModule {}