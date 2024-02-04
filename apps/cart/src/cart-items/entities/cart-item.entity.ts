import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from '../../product/entities/product.entity';

@Schema()
export class CartItem {
  @Prop()
  quantity: number;

  @Prop({ type: Types.ObjectId, ref: Product.name })
  productId: Product;

  @Prop({ type: Types.ObjectId, ref: 'Cart' })
  cartId: Types.ObjectId;
}

export type CartItemDocument = CartItem & Document;

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
