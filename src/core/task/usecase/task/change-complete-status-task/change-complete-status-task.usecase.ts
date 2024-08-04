import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ITaskGateway } from "src/application/operation/gateways/task/interfaces/Itask.gateway";
import { Task } from "src/core/task/entity/task.entity";

@Injectable()
export class ChangeCompleteStatusTaskUseCase {
  constructor(
    @Inject(ITaskGateway)
    private taskGateway: ITaskGateway,
  ) { }

  async execute(id: string): Promise<Task> {

    const taskExists = await this.taskGateway.getTaskById(id)

    if (!taskExists) throw new BadRequestException('Task does not exist!')

    return await this.taskGateway.changeCompleteStatusTask(id, taskExists.completed_status)
  }
}
