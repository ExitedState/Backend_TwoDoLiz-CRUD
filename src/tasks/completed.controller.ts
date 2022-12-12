import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('completed')
export class CompletedController {
  constructor(private readonly tasksService: TasksService) {}
  // find all completed tasks
  @Get()
  findAllCompleted() {
    return this.tasksService.findAllCompleted();
  }
}
