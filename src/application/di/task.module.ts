import { Module, Provider } from "@nestjs/common";
import { CreateTaskUseCase } from "src/core/task/usecase/task/create-task/create-task.usecase";
import { MongoDbService } from "src/infrastructure/mongodb/mongodb.service";
import { ITaskRepository } from "src/infrastructure/repositories/interfaces/Itask.repository";
import { TaskMongoDbRepository } from "src/infrastructure/repositories/task-mongodb.repository";
import { TaskControllerRoute } from "../api/http-rest/routes/task.routes";
import { CreateTaskController } from "../operation/controllers/task/create-task/create-task.controller";
import { ITaskGateway } from "../operation/gateways/task/interfaces/Itask.gateway";
import { taskGateway } from "../operation/gateways/task/task.gateway";

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
  }
];

const useCaseProviders: Provider[] = [
  {
    provide: CreateTaskUseCase,
    useFactory: (taskGateway: ITaskGateway) =>
      new CreateTaskUseCase(taskGateway),
    inject: [ITaskGateway],
  }
];

const controllerProviders: Provider[] = [
  {
    provide: CreateTaskController,
    useFactory: (createTaskUseCase: CreateTaskUseCase) =>
      new CreateTaskController(createTaskUseCase),
    inject: [CreateTaskUseCase],
  }
];

@Module({
  imports: [],
  controllers: [TaskControllerRoute],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...controllerProviders,
  ],
})
export class TasksModule { }
