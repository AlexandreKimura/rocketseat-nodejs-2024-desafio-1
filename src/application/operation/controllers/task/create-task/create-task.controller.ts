import { BadRequestException, Inject } from "@nestjs/common";
import { TaskDto } from "src/core/task/dto/task.dto";
import { Task } from "src/core/task/entity/task.entity";
import { CreateTaskUseCase } from "src/core/task/usecase/task/create-task/create-task.usecase";


export class CreateTaskController {
  constructor(
    @Inject(CreateTaskUseCase)
    private createTaskUseCase: CreateTaskUseCase,
  ) { }

  async handle(payload: TaskDto): Promise<Task> {

    if (!payload.description || !payload.title) {
      throw new BadRequestException('Missing fields!')
    }

    const taskCreated = await this.createTaskUseCase.execute(payload);

    return taskCreated;
  }
}
