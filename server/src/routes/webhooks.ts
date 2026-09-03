import { Router } from 'express';
import { mapVikunjaTask, type VikunjaTaskResponse } from '../providers/vikunja-provider';
import { onTaskCompleted } from '../events';

export const webhooksRouter = Router();

interface VikunjaWebhookPayload {
  event_name: string;
  data: {
    task: VikunjaTaskResponse;
  };
}

webhooksRouter.post('/vikunja', async (req, res) => {
  //console.log('Webhook payload received:', JSON.stringify(req.body, null, 2));
  const payload = req.body as VikunjaWebhookPayload;

  res.status(200).send('ok');

  // If Vikunja task is marked done call onTaskCompleted
  if (payload.event_name === 'task.updated' && payload.data.task.done && payload.data.task.done_at === payload.data.task.updated) {
    const task = mapVikunjaTask(payload.data.task);
    await onTaskCompleted(task);
  }
});
