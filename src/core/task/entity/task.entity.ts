import { TaskDto } from "../dto/task.dto";

export class Task {
  id?: string;
  title: string;
  description: string;
  completed_status: boolean;
  completed_at: Date | null
  created_at: Date
  updated_at: Date

  private constructor(payload: TaskDto) {
    this.title = payload.title;
    this.description = payload.description;
    this.completed_at = null
    this.completed_status = false
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  public static new(payload: TaskDto) {
    const task = new Task(payload);
    console.log(task)
    return task;
  }
}
