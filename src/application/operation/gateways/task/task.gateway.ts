import { Inject } from '@nestjs/common';
import { Task } from 'src/core/task/entity/task.entity';
import { ITaskGateway } from './interfaces/Itask.gateway';
import { ITaskRepository } from 'src/infrastructure/repositories/interfaces/Itask.repository';

export class taskGateway implements ITaskGateway {
  constructor(
    @Inject(ITaskRepository)
    private taskRepository: ITaskRepository,
  ) { }

  async createTask(task: Task): Promise<Task> {
    return await this.taskRepository.create(task)
  }
}
