import { Injectable } from '@nestjs/common';
import { GetTaskskDto } from 'src/core/task/dto/get-tasts.dto';
import { UpdateTaskDto } from 'src/core/task/dto/update-task.dto';
import { Task } from 'src/core/task/entity/task.entity';
import { TaskModel } from '../mongodb/schema/taskModel';
import { ITaskRepository } from './interfaces/Itask.repository';

@Injectable()
export class TaskMongoDbRepository implements ITaskRepository {

  async create(task: Task): Promise<Task> {
    const taskModel = TaskModel.create({
      ...task
    })
    return taskModel
  }

  async list(params: GetTaskskDto): Promise<Task[]> {
    const where = {}

    if (params.description) where['description'] = params.description
    if (params.title) where['title'] = params.title

    const tasks = await TaskModel.find(where)
    return tasks
  }

  async getById(id: string): Promise<Task | undefined> {
    return TaskModel.findById(id)
  }

  async update(id: string, payload: UpdateTaskDto): Promise<Task> {
    const update = {};

    if (payload.description) update['description'] = payload.description;
    if (payload.title) update['title'] = payload.title;

    const task = await TaskModel.findByIdAndUpdate(id, update, { new: true });

    return task;
  }
}
