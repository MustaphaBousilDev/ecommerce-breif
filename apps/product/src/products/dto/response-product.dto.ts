import { Exclude } from 'class-transformer';

export class ResponseProductDto {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;

  @Exclude()
  userId: number;

  @Exclude()
  categoryId: number;

  quantity: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<ResponseProductDto>) {
    Object.assign(this, partial);
  }
}
