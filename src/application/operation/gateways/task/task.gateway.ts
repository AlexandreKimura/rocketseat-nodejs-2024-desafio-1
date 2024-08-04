import { Inject } from '@nestjs/common';
import { Task } from 'src/core/task/entity/task.entity';
import { ITaskGateway } from './interfaces/Itask.gateway';
import { ITaskRepository } from 'src/infrastructure/repositories/interfaces/Itask.repository';
import { GetTaskskDto } from 'src/core/task/dto/get-tasts.dto';
import { UpdateTaskDto } from 'src/core/task/dto/update-task.dto';

export class taskGateway implements ITaskGateway {
  constructor(
    @Inject(ITaskRepository)
    private taskRepository: ITaskRepository,
  ) { }

  async createTask(task: Task): Promise<Task> {
    return await this.taskRepository.create(task)
  }

  async getTasks(payload: GetTaskskDto): Promise<Task[]> {
    return await this.taskRepository.list(payload)
  }

  async getTaskById(id: string): Promise<Task | undefined> {
    return await this.taskRepository.getById(id)
  }

  async updateTask(id: string, payload: UpdateTaskDto): Promise<Task> {
    return await this.taskRepository.update(id, payload)
  }
}
