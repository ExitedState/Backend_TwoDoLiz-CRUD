/* eslint-disable prettier/prettier */
import { Exclude, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/user/schemas/user.schema';
import { BaseTodoDto } from './base-todo.dto';

export class UpdateTodoDto extends BaseTodoDto {
  completedAt: Date;

  @IsOptional()
  @Exclude()
  _id: string;

  @Type(() => User)
  @IsNotEmpty()
  author:User;
}

