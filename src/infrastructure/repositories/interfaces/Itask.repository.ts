import { GetTaskskDto } from "src/core/task/dto/get-tasts.dto";
import { UpdateTaskDto } from "src/core/task/dto/update-task.dto";
import { Task } from "src/core/task/entity/task.entity";

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  list(params: GetTaskskDto): Promise<Task[]>
  getById(id: string): Promise<Task | undefined>
  update(id: string, payload: UpdateTaskDto): Promise<Task>
  delete(id: string): Promise<void>
}

export const ITaskRepository = Symbol('ITaskRepository');
