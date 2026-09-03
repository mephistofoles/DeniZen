import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

vi.mock('../events', () => ({
  onTaskCompleted: vi.fn(),
}));

import { app } from '../app';
import { onTaskCompleted } from '../events';

describe('POST /api/webhooks/vikunja', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls onTaskCompleted when a task is marked done', async () => {
    const payload = {
      event_name: 'task.updated',
      data: {
        task: { id: 1, title: 'Completed task', done: true, due_date: '', project_id: 1, done_at: '2026-09-03T19:35:27Z', updated: '2026-09-03T19:35:27Z' },
      },
    };

    const res = await request(app).post('/api/webhooks/vikunja').send(payload);

    expect(res.status).toBe(200);
    expect(onTaskCompleted).toHaveBeenCalledWith(
      expect.objectContaining({ id: '1', title: 'Completed task', done: true })
    );
  });

  it('does not call onTaskCompleted for non-completion events', async () => {
    const payload = {
      event_name: 'task.updated',
      data: {
        task: { id: 1, title: 'Uncompleted task', done: false, due_date: '', project_id: 1, done_at: '0001-01-01T00:00:00Z', updated: '2026-09-03T19:35:27Z' },
      },
    };

    await request(app).post('/api/webhooks/vikunja').send(payload);

    expect(onTaskCompleted).not.toHaveBeenCalled();
  });

  it('does not call onTaskCompleted for updates after previous completion event', async () => {
    const payload = {
      event_name: 'task.updated',
      data: {
        task: { id: 1, title: 'Previously Completed task', done: true, due_date: '', project_id: 1, done_at: '2026-09-03T19:35:27Z', updated: '2026-09-03T19:37:29Z' },
      },
    };

    await request(app).post('/api/webhooks/vikunja').send(payload);

    expect(onTaskCompleted).not.toHaveBeenCalled();
  });
});
