import type { Task, TaskCompletedMessage } from '@denizen/shared';
import { broadcast } from './ws';

export async function onTaskCompleted(task: Task): Promise<void> {
  console.log('Task completed:', task.title);
  const message: TaskCompletedMessage = { type: 'task-completed', task };
  broadcast(message);
}
