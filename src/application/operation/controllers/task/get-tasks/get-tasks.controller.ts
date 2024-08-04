import { Inject } from "@nestjs/common";
import { GetTaskskDto } from "src/core/task/dto/get-tasts.dto";
import { Task } from "src/core/task/entity/task.entity";
import { GetTasksUseCase } from "src/core/task/usecase/task/get-tasks/get-tasks.usecase";


export class GetTasksController {
  constructor(
    @Inject(GetTasksUseCase)
    private getTaskskUseCase: GetTasksUseCase,
  ) { }

  async handle(payload: GetTaskskDto): Promise<Task[]> {

    const tasks = await this.getTaskskUseCase.execute(payload);

    return tasks;
  }
}
