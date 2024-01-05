import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product, ProductSchema } from 'src/products/entities/product.entity';
@Schema()
export class Cart {
  @Prop({ type: [{ type: ProductSchema }] })
  products: Product[];  
}

export type CartDocument = Cart & Document;
export const CartSchema = SchemaFactory.createForClass(Cart);