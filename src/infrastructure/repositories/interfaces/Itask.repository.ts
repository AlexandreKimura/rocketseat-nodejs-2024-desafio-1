import { Task } from "src/core/task/entity/task.entity";

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
}

export const ITaskRepository = Symbol('ITaskRepository');
