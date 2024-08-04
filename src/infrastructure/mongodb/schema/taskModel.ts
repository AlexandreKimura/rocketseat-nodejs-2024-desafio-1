import { model, Schema } from "mongoose";
import { Task as TaskEntity } from "src/core/task/entity/task.entity";

export const TaskSchema = new Schema<TaskEntity>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed_at: { type: Date, default: null },
  completed_status: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});


export const TaskModel = model('Task', TaskSchema);