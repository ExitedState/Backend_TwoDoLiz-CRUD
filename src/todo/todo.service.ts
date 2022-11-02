/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly model: Model<TodoDocument>,
  ) {}

  async findAll(): Promise<TodoDocument[]> {
    return await this.model.find().populate('author').exec();
  }

  async findOne(id: string): Promise<TodoDocument> {
    return await this.model.findById(id).populate('author').exec();
  }

  async create(createTodoDto: CreateTodoDto,author: User): Promise<TodoDocument> {
    return await new this.model({
      ...createTodoDto,
      createdAt: new Date(),
      User,
    }).save();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<TodoDocument> {
    return await this.model.findByIdAndUpdate(id, updateTodoDto).exec();
  }

  async delete(id: string): Promise<TodoDocument> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
