import { Exclude } from 'class-transformer';

export class ResponseCategoryDto {
  id: number;
  name: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<ResponseCategoryDto>) {
    Object.assign(this, partial);
  }
}
