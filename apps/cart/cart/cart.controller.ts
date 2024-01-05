import { Controller, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { CartService } from './cart.service';
import { ObjectId } from 'mongoose';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addProductToCart(@Body() cartDto: { cartId: string; productId: string; quantity: number }) {
    const cart = await this.cartService.addProductToCart(cartDto.cartId, cartDto.productId, cartDto.quantity);
    return { message: 'Product added to cart successfully', cart };
  }

  @Delete()
  async deleteProductFromCart(@Body() cartDto: { cartId: string; productId: string }) {
    const cart = await this.cartService.deleteProductFromCart(cartDto.cartId, cartDto.productId);
    return { message: 'Product deleted from cart successfully', cart };
  }
  
  @Patch()
  async updateProductQuantity(@Body() updateDto: { cartId: string; productId: string; quantity: number }) {
    const { cartId, productId, quantity } = updateDto;
    const cart = await this.cartService.updateProductQuantity(cartId, productId, quantity);
    return { message: 'Product quantity updated in cart successfully', cart };
  }

}
