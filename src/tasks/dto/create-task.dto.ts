import { Prop } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/user.schema";
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Exclude } from "class-transformer";

export class CreateTaskDto {
  title: string;
  detail: string;
  completed: boolean;
  completedAt: Date;
  tag: string;
  hasCompletedDate: boolean;

  @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
    author: User;

  @IsOptional()
  @Exclude()
    _id: string;
}
