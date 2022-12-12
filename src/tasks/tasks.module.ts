import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './entities/task.entity';
import { CompletedController } from './completed.controller';
import { UnCompletedController } from './uncompleted.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  controllers: [TasksController, CompletedController, UnCompletedController],
  providers: [TasksService],
})
export class TasksModule {}
