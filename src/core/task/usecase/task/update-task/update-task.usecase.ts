import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ITaskGateway } from "src/application/operation/gateways/task/interfaces/Itask.gateway";
import { UpdateTaskDto } from "src/core/task/dto/update-task.dto";
import { Task } from "src/core/task/entity/task.entity";

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(ITaskGateway)
    private taskGateway: ITaskGateway,
  ) { }

  async execute(id: string, payload: UpdateTaskDto): Promise<Task> {

    const taskExists = await this.taskGateway.getTaskById(id)

    if(!taskExists) throw new BadRequestException('Task does not exist!')

    const task = await this.taskGateway.updateTask(id, payload)
    return task;
  }
}
