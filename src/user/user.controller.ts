import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from './userDetails.interface';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetails | null> {
    return this.UserService.findByID(id);
  }
}
