import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
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
}
