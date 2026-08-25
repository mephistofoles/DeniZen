import express from 'express';
import type { HealthCheck } from '@denizen/shared';

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/api/health', (req, res) => {
  const response: HealthCheck = { status: 'ok' };
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
