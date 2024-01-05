// user.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service'; // Import the UserService

@Controller('users') // This decorator sets the base route for all methods in this controller
export class UserController {
  constructor(private readonly userService: UserService) {} // Inject the UserService

//   @Get()
//   async getAllUsers() {
//     return await this.userService.getAllUsers(); // Implement this method in UserService
//   }

  @Post()
  async createUser(@Body() userData: any) {
    return await this.userService.createUser(userData); // Implement this method in UserService
  }
}
