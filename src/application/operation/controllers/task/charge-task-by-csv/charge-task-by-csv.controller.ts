import { Inject } from "@nestjs/common";
import { ChargeTaskByCsvUseCase } from "src/core/task/usecase/task/charge-task-by-csv/charge-task-by-csv.usecase";

export class ChargeTaskByCsvController {
  constructor(
    @Inject(ChargeTaskByCsvUseCase)
    private chargeTaskByCsvUseCase: ChargeTaskByCsvUseCase,
  ) { }

  async handle(): Promise<void> {
    await this.chargeTaskByCsvUseCase.execute();
  }
}
