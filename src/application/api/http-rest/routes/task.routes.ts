import { Body, Controller, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';

import { CreateTaskController } from 'src/application/operation/controllers/task/create-task/create-task.controller';
import { GetTasksController } from 'src/application/operation/controllers/task/get-tasks/get-tasks.controller';
import { UpdateTaskController } from 'src/application/operation/controllers/task/update-task/update-task.controller';
import { GetTaskskDto } from 'src/core/task/dto/get-tasts.dto';
import { TaskDto } from 'src/core/task/dto/task.dto';
import { UpdateTaskDto } from 'src/core/task/dto/update-task.dto';
import { Task } from 'src/core/task/entity/task.entity';


@Controller('/tasks')
export class TaskControllerRoute {
  constructor(
    @Inject(CreateTaskController)
    private createTaskController: CreateTaskController,

    @Inject(GetTasksController)
    private getTasksController: GetTasksController,

    @Inject(UpdateTaskController)
    private updateTaskController: UpdateTaskController,
  ) { }

  @Post('/')
  async createTask(@Body() payload: TaskDto): Promise<Task> {
    const taskCreated = await this.createTaskController.handle(payload);
    return taskCreated;
  }

  @Get('/')
  async getTasks(@Query() payload: GetTaskskDto): Promise<Task[]> {
    const tasks = await this.getTasksController.handle(payload);
    return tasks;
  }

  @Put('/:id')
  async updateTask(@Param() params: { id: string }, @Body() payload: UpdateTaskDto): Promise<Task> {
    const task = await this.updateTaskController.handle(params.id, payload);
    return task;
  }
}
