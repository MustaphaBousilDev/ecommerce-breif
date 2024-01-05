import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, SchemaTypes, Types } from 'mongoose';

@Schema()
export class Product {
   @Prop({ type: SchemaTypes.ObjectId }) 
  _id: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
