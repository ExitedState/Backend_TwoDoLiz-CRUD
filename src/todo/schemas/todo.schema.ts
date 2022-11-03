/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Transform, Type } from 'class-transformer';


export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Transform(({value}) =>value.toString())
  _id: ObjectId;


  @Prop({ require: true })
  name: string;

  @Prop()
  detail: string;

  @Prop()
  completedAt: Date;

  @Prop({ require: true })
  createAt: Date;

  @Prop()
  deletedAt: Date;

  //default value:false
  @Prop({ default: false })
  is_finished: boolean;

  @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'User'})
  @Type(() =>User)
  author: User;

  

}
export const TodoSchema = SchemaFactory.createForClass(Todo);
