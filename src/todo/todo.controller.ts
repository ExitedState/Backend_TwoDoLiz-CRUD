/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RequestWithUser } from 'src/auth/requestWithUser.interface';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoDocument } from './schemas/todo.schema';
import { TodoService } from './todo.service';

@Controller('todo')

export class TodoController {
  constructor(private readonly service: TodoService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async find(@Param('id') id: string): Promise<TodoDocument>{
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.service.create(createTodoDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return  await this.service.update(id, updateTodoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
