/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
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

}
export const TodoSchema = SchemaFactory.createForClass(Todo);
