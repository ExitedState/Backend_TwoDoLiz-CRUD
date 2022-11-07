import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UserDetails } from 'src/users/users.detail.interface';
import { ExistingUserDto } from 'src/users/dto/existingUser.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    async hashPassword(password: string): Promise<string>{
        return bcrypt.hash(password,12);
    }

    async register(user: Readonly<CreateUserDto>): Promise<UserDetails | any>{
        const { name, email, password } = user;
        const existingUser = await this.userService.findByEmail(email);
        if(existingUser)
            throw new HttpException(
                'An account with that email already exist!',
                HttpStatus.CONFLICT,
            )
        
        const hashedPassword = await this.hashPassword(password);
        const newUser = await this.userService.create(name,email,hashedPassword);
        return this.userService._getUserDetails(newUser);
    }

    async doesPasswordMatch(
        password:string,
        hashedPassword:string,
    ):Promise<boolean>{
        return bcrypt.compare(password,hashedPassword);
    }

    async validateUser(
        email: string,
        password: string,
    ): Promise<UserDetails | null>{
        const user = await this.userService.findByEmail(email);
        const doesUserExist = !!user;
        if(!doesUserExist) return null;
        const doesPasswordMatch = await this.doesPasswordMatch(
            password,
            user.password,
        );
        if(!doesPasswordMatch) return null;
        return this.userService._getUserDetails(user);
    }

    async login(
        existingUser: ExistingUserDto,
    ): Promise<{ token: string } | null> {
        const { email, password } = existingUser;
        const user = await this.validateUser(email, password);
    
        if (!user)
          throw new HttpException('Credentials invalid!', HttpStatus.UNAUTHORIZED);
    
        const jwt = await this.jwtService.signAsync({ user });
        return { token: jwt };
    }
    
    async verifyJwt(jwt: string): Promise<{ exp: number }> {
     try {
          const { exp } = await this.jwtService.verifyAsync(jwt);
          return { exp };
        } catch (error) {
          throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
     }
    }
}
