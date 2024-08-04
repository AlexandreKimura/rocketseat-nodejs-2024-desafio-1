import { Inject } from "@nestjs/common";
import { Task } from "src/core/task/entity/task.entity";
import { ChangeCompleteStatusTaskUseCase } from "src/core/task/usecase/task/change-complete-status-task/change-complete-status-task.usecase";

export class ChangeCompleteStatusTaskController {
  constructor(
    @Inject(ChangeCompleteStatusTaskUseCase)
    private changeCompleteStatusTaskUseCase: ChangeCompleteStatusTaskUseCase,
  ) { }

  async handle(id: string): Promise<Task> {
    const task = await this.changeCompleteStatusTaskUseCase.execute(id);

    return task;
  }
}
