import { GetTaskskDto } from "src/core/task/dto/get-tasts.dto";
import { UpdateTaskDto } from "src/core/task/dto/update-task.dto";
import { Task } from "src/core/task/entity/task.entity";

export interface ITaskGateway {
  createTask(Task: Task): Promise<Task>;
  getTasks(payload: GetTaskskDto): Promise<Task[]>
  getTaskById(id: string): Promise<Task | undefined>
  updateTask(id: string, payload: UpdateTaskDto): Promise<Task>
  deleteTask(id: string): Promise<void>
}

export const ITaskGateway = Symbol('ITaskGateway');
