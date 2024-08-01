import { TaskDto } from "../dto/task-dto";

export class Task {
  id?: string;
  title: string;
  description: string;
  completed_at?: Date
  created_at?: Date
  updated_at?: Date

  private constructor(payload: TaskDto) {
    this.title = payload.title;
    this.description = payload.description;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  public static new(payload: TaskDto) {
    const task = new Task(payload);
    return task;
  }
}
