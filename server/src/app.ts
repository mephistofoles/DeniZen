import express from 'express';
import type { HealthCheck } from '@denizen/shared';

export const app = express();

app.get('/api/health', (req, res) => {
  const response: HealthCheck = { status: 'ok' };
  res.json(response);
});
