import { Module, Provider } from "@nestjs/common";
import { CreateTaskUseCase } from "src/core/task/usecase/task/create-task/create-task.usecase";
import { GetTasksUseCase } from "src/core/task/usecase/task/get-tasks/get-tasks.usecase";
import { MongoDbService } from "src/infrastructure/mongodb/mongodb.service";
import { ITaskRepository } from "src/infrastructure/repositories/interfaces/Itask.repository";
import { TaskMongoDbRepository } from "src/infrastructure/repositories/task-mongodb.repository";
import { TaskControllerRoute } from "../api/http-rest/routes/task.routes";
import { CreateTaskController } from "../operation/controllers/task/create-task/create-task.controller";
import { GetTasksController } from "../operation/controllers/task/get-tasks/get-tasks.controller";
import { UpdateTaskController } from "../operation/controllers/task/update-task/update-task.controller";
import { ITaskGateway } from "../operation/gateways/task/interfaces/Itask.gateway";
import { taskGateway } from "../operation/gateways/task/task.gateway";
import { UpdateTaskUseCase } from "src/core/task/usecase/task/update-task/update-task.usecase";
import { DeleteTaskUseCase } from "src/core/task/usecase/task/delete-task/delete-task.usecase";
import { DeleteTaskController } from "../operation/controllers/task/delete-task/delete-task.controller";
import { ChangeCompleteStatusTaskUseCase } from "src/core/task/usecase/task/change-complete-status-task/change-complete-status-task.usecase";
import { ChangeCompleteStatusTaskController } from "../operation/controllers/task/change-complete-status-task/change-complete-status-task.controller";
import { IStreamCsvGateway } from "../operation/gateways/stream-csv/interfaces/istream-csv.gateway";
import { StreamCsvGateway } from "../operation/gateways/stream-csv/stream-csv.gateway";
import { ChargeTaskByCsvUseCase } from "src/core/task/usecase/task/charge-task-by-csv/charge-task-by-csv.usecase";
import { ChargeTaskByCsvController } from "../operation/controllers/task/charge-task-by-csv/charge-task-by-csv.controller";
import { MulterModule } from "@nestjs/platform-express";

const persistenceProviders: Provider[] = [
  MongoDbService,
  {
    provide: ITaskGateway,
    useFactory: (taskRepository: ITaskRepository) =>
      new taskGateway(taskRepository),
    inject: [ITaskRepository],
  },
  {
    provide: ITaskRepository,
    useFactory: () =>
      new TaskMongoDbRepository(),
    inject: [],
  },
  {
    provide: IStreamCsvGateway,
    useFactory: () =>
      new StreamCsvGateway(),
    inject: [],
  }
];

const useCaseProviders: Provider[] = [
  {
    provide: CreateTaskUseCase,
    useFactory: (taskGateway: ITaskGateway) =>
      new CreateTaskUseCase(taskGateway),
    inject: [ITaskGateway],
  },
  {
    provide: GetTasksUseCase,
    useFactory: (taskGateway: ITaskGateway) =>
      new GetTasksUseCase(taskGateway),
    inject: [ITaskGateway],
  },
  {
    provide: UpdateTaskUseCase,
    useFactory: (taskGateway: ITaskGateway) =>
      new UpdateTaskUseCase(taskGateway),
    inject: [ITaskGateway],
  },
  {
    provide: DeleteTaskUseCase,
    useFactory: (taskGateway: ITaskGateway) =>
      new DeleteTaskUseCase(taskGateway),
    inject: [ITaskGateway],
  },
  {
    provide: ChangeCompleteStatusTaskUseCase,
    useFactory: (taskGateway: ITaskGateway) =>
      new ChangeCompleteStatusTaskUseCase(taskGateway),
    inject: [ITaskGateway],
  },
  {
    provide: ChargeTaskByCsvUseCase,
    useFactory: (taskGateway: ITaskGateway, streamCsvGateway: IStreamCsvGateway) =>
      new ChargeTaskByCsvUseCase(taskGateway, streamCsvGateway),
    inject: [ITaskGateway, IStreamCsvGateway],
  }
];

const controllerProviders: Provider[] = [
  {
    provide: CreateTaskController,
    useFactory: (createTaskUseCase: CreateTaskUseCase) =>
      new CreateTaskController(createTaskUseCase),
    inject: [CreateTaskUseCase],
  },
  {
    provide: GetTasksController,
    useFactory: (getTasksUseCase: GetTasksUseCase) =>
      new GetTasksController(getTasksUseCase),
    inject: [GetTasksUseCase],
  },
  {
    provide: UpdateTaskController,
    useFactory: (updateTaskUseCase: UpdateTaskUseCase) =>
      new UpdateTaskController(updateTaskUseCase),
    inject: [UpdateTaskUseCase],
  },
  {
    provide: DeleteTaskController,
    useFactory: (deleteTaskUseCase: DeleteTaskUseCase) =>
      new DeleteTaskController(deleteTaskUseCase),
    inject: [DeleteTaskUseCase],
  },
  {
    provide: ChangeCompleteStatusTaskController,
    useFactory: (changeCompleteStatusTaskUseCase: ChangeCompleteStatusTaskUseCase) =>
      new ChangeCompleteStatusTaskController(changeCompleteStatusTaskUseCase),
    inject: [ChangeCompleteStatusTaskUseCase],
  },
  {
    provide: ChargeTaskByCsvController,
    useFactory: (chargeTaskByCsvUseCase: ChargeTaskByCsvUseCase) =>
      new ChargeTaskByCsvController(chargeTaskByCsvUseCase),
    inject: [ChargeTaskByCsvUseCase],
  }
];

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [TaskControllerRoute],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...controllerProviders,
  ],
})
export class TasksModule { }
