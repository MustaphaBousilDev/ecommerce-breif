import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user/user.model';
import { Product } from './products/product.model';

enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
}

@Schema()
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId; // Reference to the User model

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId; // Reference to the Product model

  @Prop({ required: true, default: 1 }) 
  quantity: number;

  @Prop({ enum: PaymentMethod, required: true })
  paymentMethod: PaymentMethod;

  // Other properties specific to your orders
}

export const OrderSchema = SchemaFactory.createForClass(Order);
