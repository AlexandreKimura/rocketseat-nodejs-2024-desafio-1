import { Inject } from "@nestjs/common";
import { DeleteTaskUseCase } from "src/core/task/usecase/task/delete-task/delete-task.usecase";

export class DeleteTaskController {
  constructor(
    @Inject(DeleteTaskUseCase)
    private deleteTaskUseCase: DeleteTaskUseCase,
  ) { }

  async handle(id: string): Promise<void> {
    return await this.deleteTaskUseCase.execute(id);
  }
}
