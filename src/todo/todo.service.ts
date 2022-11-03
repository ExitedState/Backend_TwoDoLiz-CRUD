/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { User } from 'src/user/schemas/user.schema';
import { authorize } from 'passport';

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

  async create(createTodoDto: CreateTodoDto): Promise<TodoDocument>{
    const createTodo = new this.model({
      ...createTodoDto,
    });
    return await createTodo.save();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<TodoDocument> {
    return await this.model.findByIdAndUpdate(id, updateTodoDto).populate('author').exec();
  }

  async delete(id: string): Promise<TodoDocument> {
    return await this.model.findByIdAndDelete(id).populate('author').exec();
  }
}
