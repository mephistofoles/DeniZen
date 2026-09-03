import type { Task } from './task';

export interface TaskCompletedMessage {
  type: 'task-completed';
  task: Task;
}
