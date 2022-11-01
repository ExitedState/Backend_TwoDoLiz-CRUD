import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dto/newUser.dto';

import { UserService } from 'src/user/user.service';
import { UserDetails } from 'src/user/userDetails.interface';


@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async hashPassword(password: string): Promise<string>{
        return bcrypt.hash(password,12);
    }

    async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any>{
        const{name, email, password} = user;

        const existingUser =  await this.userService.findByEmail(email);

        if(existingUser) return 'Already exist';

        const hashedPassword = await this.hashPassword(password);

        const newUser = await this.userService.create(name,email,hashedPassword);
        return this.userService._getUserDetails(newUser);
    }

    async doesPasswordMatch(password:string, hashedPassword: string):Promise<boolean>{
        return bcrypt.compare(password, hashedPassword);
    }

}
