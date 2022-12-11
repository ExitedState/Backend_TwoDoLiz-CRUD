import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { User } from 'src/user/user.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel({
      ...createTaskDto,
    });
    return await createdTask.save();
  }

  async findAll() {
    //sorted
    return await this.taskModel
      .find()
      .collation({ locale: 'th', caseFirst: 'upper' })
      .sort({ hasCompletedDate: -1, completedAt: 1 })
      // .sort({ completed: 1 })
      .sort({ title: 1 })
      // .sort({ hasCompletedDate: 1 })
      .populate('author')
      .exec();
    // return await this.taskModel.find().exec();
  }

  async findOne(id: string) {
    return await this.taskModel.findById(id).populate('author').exec();
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

  async removeAll() {
    return await this.taskModel.deleteMany().exec();
  }

  async findAllCompleted() {
    return await this.taskModel
      .find({ completed: true })
      .collation({ locale: 'th', caseFirst: 'upper' })
      .sort({ hasCompletedDate: -1, completedAt: 1 })
      .sort({ title: 1 })
      .populate('author')
      .exec();
  }

  async findAllNotCompleted() {
    return await this.taskModel
      .find({ completed: false })
      .collation({ locale: 'th', caseFirst: 'upper' })
      .sort({ hasCompletedDate: -1, completedAt: 1 })
      .sort({ title: 1 })
      .populate('author')
      .exec();
  }
}
