import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { ExistingUserDto } from 'src/users/dto/existingUser.dto';
import { UserDetails } from 'src/users/users.detail.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() user: CreateUserDto): Promise<UserDetails | null> {
      return this.authService.register(user);
    }
  
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user: ExistingUserDto): Promise<{ token: string } | null> {
      return this.authService.login(user);
    }
  
    @Post('verify-jwt')
    @HttpCode(HttpStatus.OK)
    verifyJwt(@Body() payload: { jwt: string }) {
      return this.authService.verifyJwt(payload.jwt);
    }
}
