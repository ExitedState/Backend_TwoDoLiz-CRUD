import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User{
    @Transform(({value}) => value.toString())
    _id:string;

    @Prop({required: true})
    name: string;

    @Prop({required: true, unique:true})
    email: string;

    @Prop({required: true})
    @Exclude()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);