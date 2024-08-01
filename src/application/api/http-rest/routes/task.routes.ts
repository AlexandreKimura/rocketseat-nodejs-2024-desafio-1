import { Body, Controller, Inject, Post } from '@nestjs/common';

import { CreateTaskController } from 'src/application/operation/controllers/task/create-task/create-task.controller';
import { TaskDto } from 'src/core/task/dto/task-dto';
import { Task } from 'src/core/task/entity/task.entity';


@Controller('/tasks')
export class TaskControllerRoute {
  constructor(
    @Inject(CreateTaskController)
    private createTaskController: CreateTaskController,
  ) { }

  @Post('/')
  async createTask(@Body() payload: TaskDto): Promise<Task> {
    const taskCreated = await this.createTaskController.handle(payload);
    return taskCreated;
  }
}
