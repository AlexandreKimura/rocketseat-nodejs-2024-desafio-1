import { Inject, Injectable } from "@nestjs/common";
import { ITaskGateway } from "src/application/operation/gateways/task/interfaces/Itask.gateway";
import { TaskDto } from "src/core/task/dto/task-dto";
import { Task } from "src/core/task/entity/task.entity";

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(ITaskGateway)
    private taskGateway: ITaskGateway,
  ) { }

  async execute(payload: TaskDto): Promise<Task> {

    const taskCreated = await this.taskGateway.createTask(payload)
    return taskCreated;
  }
}