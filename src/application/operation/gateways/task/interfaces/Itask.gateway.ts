import { Task } from "src/core/task/entity/task.entity";

export interface ITaskGateway {
  createTask(Task: Task): Promise<Task>;
}

export const ITaskGateway = Symbol('ITaskGateway');
