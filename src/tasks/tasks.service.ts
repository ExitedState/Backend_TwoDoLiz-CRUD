import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel(createTaskDto);
    return await createdTask.save();
  }

  async findAll() {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string) {
    return await this.taskModel.findById(id).exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
    if (!Task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return updatedTask;
  }

  async remove(id: string) {
    const deletedTask = await this.taskModel.findByIdAndRemove(id).exec();
    if (!Task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return deletedTask;
  }

  async sortDate() {
    return await this.taskModel.find().sort({ completedAt: 1 }).exec();
  }

  async sortTitle() {
    return await this.taskModel.find().sort({ title: 1 }).exec();
  }

  async sortTag() {
    return await this.taskModel.find().sort({ tag: 1 }).exec();
  }
}
