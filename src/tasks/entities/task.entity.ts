import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';
import { User } from 'src/user/user.schema';

export type TaskDocument = Task & Document;
@Schema({
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class Task {
  @Transform(({value}) =>value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false, default: false })
  completed: boolean;

  @Prop({ required: false, default: null })
  detail: string;

  @Prop({ required: false, default: null })
  completedAt: Date;

  @Prop({ required: false })
  tag: string;

  @Prop({ required: false })
  hasCompletedDate: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  @Type(() => User)
  author: User;
}

const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.virtual('id').get(function (this: Document) {
  return this._id.toHexString();
});

export { TaskSchema };
