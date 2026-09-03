import express from 'express';
import type { HealthCheck } from '@denizen/shared';
import { tasksRouter } from './routes/tasks';
import { webhooksRouter } from './routes/webhooks';

export const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  const response: HealthCheck = { status: 'ok' };
  res.json(response);
});

app.use('/api/tasks', tasksRouter);
app.use('/api/webhooks', webhooksRouter);
