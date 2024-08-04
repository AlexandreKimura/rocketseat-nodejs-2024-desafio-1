import { Inject, Injectable } from "@nestjs/common";
import { ITaskGateway } from "src/application/operation/gateways/task/interfaces/Itask.gateway";
import { GetTaskskDto } from "src/core/task/dto/get-tasts.dto";
import { Task } from "src/core/task/entity/task.entity";

@Injectable()
export class GetTasksUseCase {
  constructor(
    @Inject(ITaskGateway)
    private taskGateway: ITaskGateway,
  ) { }

  async execute(payload: GetTaskskDto): Promise<Task[]> {

    const tasks = await this.taskGateway.getTasks(payload)
    return tasks;
  }
}
