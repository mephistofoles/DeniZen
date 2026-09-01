import express from 'express';
import type { HealthCheck } from '@denizen/shared';
import { tasksRouter } from './routes/tasks';

export const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  const response: HealthCheck = { status: 'ok' };
  res.json(response);
});

app.use('/api/tasks', tasksRouter);
