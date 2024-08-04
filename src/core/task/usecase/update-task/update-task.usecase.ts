import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ITaskGateway } from "src/application/operation/gateways/task/interfaces/Itask.gateway";
import { GetTaskskDto } from "src/core/task/dto/get-tasts.dto";
import { TaskDto } from "src/core/task/dto/task.dto";
import { Task } from "src/core/task/entity/task.entity";
import { UpdateTaskDto } from "../../dto/update-task.dto";

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
