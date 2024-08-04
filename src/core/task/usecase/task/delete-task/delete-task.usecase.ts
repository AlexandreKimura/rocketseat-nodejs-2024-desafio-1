import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ITaskGateway } from "src/application/operation/gateways/task/interfaces/Itask.gateway";

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject(ITaskGateway)
    private taskGateway: ITaskGateway,
  ) { }

  async execute(id: string): Promise<void> {

    const taskExists = await this.taskGateway.getTaskById(id)

    if (!taskExists) throw new BadRequestException('Task does not exist!')

    return await this.taskGateway.deleteTask(id,)
  }
}
