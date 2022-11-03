import { Body, Controller,HttpCode,HttpStatus,Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ExistingUserDTO } from 'src/user/dto/existingUser.dto';
import { NewUserDTO } from 'src/user/dto/newUser.dto';
import { User } from 'src/user/schemas/user.schema';
import { UserDetails } from 'src/user/userDetails.interface';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';

import { AuthService } from './auth.service';


@Controller('auth')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    register(@Body() user: NewUserDTO): Promise<UserDetails | null>{
        return this.authService.register(user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user: ExistingUserDTO): Promise<{token: string} | null>{
        return this.authService.login(user);
    }
}
