import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('uncompleted')
export class UnCompletedController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  findAllNotCompleted() {
    return this.tasksService.findAllNotCompleted();
  }
}
