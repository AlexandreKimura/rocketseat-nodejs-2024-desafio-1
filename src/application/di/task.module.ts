import { Module, Provider } from "@nestjs/common";
import { CreateTaskUseCase } from "src/core/task/usecase/task/create-task/create-task.usecase";
import { GetTasksUseCase } from "src/core/task/usecase/task/get-tasks/get-tasks.usecase";
import { UpdateTaskUseCase } from "src/core/task/usecase/update-task/update-task.usecase";
import { MongoDbService } from "src/infrastructure/mongodb/mongodb.service";
import { ITaskRepository } from "src/infrastructure/repositories/interfaces/Itask.repository";
import { TaskMongoDbRepository } from "src/infrastructure/repositories/task-mongodb.repository";
import { TaskControllerRoute } from "../api/http-rest/routes/task.routes";
import { CreateTaskController } from "../operation/controllers/task/create-task/create-task.controller";
import { GetTasksController } from "../operation/controllers/task/get-tasks/get-tasks.controller";
import { UpdateTaskController } from "../operation/controllers/task/update-task/update-task.controller";
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
