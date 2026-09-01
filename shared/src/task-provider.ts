import type { Task } from './task';

export interface TaskProvider {
  getTasks(): Promise<Task[]>;
  createTask(input: Partial<Task>): Promise<Task>;
  completTask(id: string): Promise<Task>;
  updateTask(id: string, input: Partial<Task>): Promise<Task>;
}
