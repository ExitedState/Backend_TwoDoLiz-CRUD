import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;
@Schema({
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class Task {
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
}

const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.virtual('id').get(function (this: Document) {
  return this._id.toHexString();
});

export { TaskSchema };
