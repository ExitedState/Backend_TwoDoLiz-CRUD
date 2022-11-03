/* eslint-disable prettier/prettier */
import { Prop } from '@nestjs/mongoose';
import { Exclude, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { BaseTodoDto } from './base-todo.dto';

export class CreateTodoDto extends BaseTodoDto {
    @IsOptional()
    @Exclude()
    _id: string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    author: User;
}

export default CreateTodoDto;
