import { Inject, Injectable } from "@nestjs/common";
import * as path from 'path';
import { IStreamCsvGateway } from "src/application/operation/gateways/stream-csv/interfaces/istream-csv.gateway";
import { ITaskGateway } from "src/application/operation/gateways/task/interfaces/Itask.gateway";
import { Task } from "src/core/task/entity/task.entity";

@Injectable()
export class ChargeTaskByCsvUseCase {
  constructor(
    @Inject(ITaskGateway)
    private taskGateway: ITaskGateway,

    @Inject(IStreamCsvGateway)
    private streamCsvGateway: IStreamCsvGateway,
  ) { }

  async execute(filename: string): Promise<void> {
    const filePath = path.join(process.cwd(), 'uploads', filename);
    const dataFromFile = await this.streamCsvGateway.read(filePath)

    for (const info of dataFromFile) {
      const newTask = Task.new({ title: info.title, description: info.description });
      await this.taskGateway.createTask(newTask)
    }
  }
}
