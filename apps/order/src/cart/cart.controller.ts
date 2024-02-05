import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './cart.model';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  async getUserCart(@Param('userId') userId: string): Promise<Cart | null> {
    return this.cartService.getUserCart(userId);
  }

  @Post(':userId')
  async addItemToCart(
    @Param('userId') userId: string,
    @Body() item: any
  ): Promise<Cart | null> {
    return this.cartService.addItemToCart(userId, item);
  }

  @Delete(':userId/item/:itemId')
  async removeItemFromCart(
    @Param('userId') userId: string,
    @Param('itemId') itemId: string
  ): Promise<Cart | null> {
    return this.cartService.removeItemFromCart(userId, itemId);
  }

  @Patch(':userId/item/:itemId/quantity/:quantity')
  async updateCartItemQuantity(
    @Param('userId') userId: string,
    @Param('itemId') itemId: string,
    @Param('quantity') quantity: number
  ): Promise<Cart | null> {
    return this.cartService.updateCartItemQuantity(userId, itemId, quantity);
  }

  @Delete(':userId')
  async clearCart(@Param('userId') userId: string): Promise<void> {
    return this.cartService.clearCart(userId);
  }
}
