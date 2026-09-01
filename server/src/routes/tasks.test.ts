import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

vi.mock('../providers/vikunja-provider', () => ({
  taskProvider: {
    getTasks: vi.fn(),
    createTask: vi.fn(),
    updateTask: vi.fn(),
    completeTask: vi.fn(),
  },
}));

import { app } from '../app';
import { taskProvider } from '../providers/vikunja-provider';

describe('GET /api/tasks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns tasks from the provider', async () => {
    const mockTasks = [{ id: '1', title: 'Test task', done: false }];
    vi.mocked(taskProvider.getTasks).mockResolvedValue(mockTasks);

    const res = await request(app).get('/api/tasks');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockTasks);
  });
});

describe('POST /api/tasks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });  

  it('creates a task via the provider', async () => {
    const newTask = { id: '2', title: 'New task', done: false };
    vi.mocked(taskProvider.createTask).mockResolvedValue(newTask);

    const res = await request(app).post('/api/tasks').send({ title: 'New task' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(newTask);
  });
});

describe('PATCH /api/tasks/:id', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('updates a task via the provider', async () => {
    const updatedTask = { id: '3', title: 'Updated task' };
    vi.mocked(taskProvider.updateTask).mockResolvedValue(updatedTask);

    const res = await request(app)
      .patch('/api/tasks/3')
      .send({ title: 'Updated task' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedTask);
    expect(taskProvider.updateTask).toHaveBeenCalledWith('3', {
      title: 'Updated task',
    });
  });
});

describe('PATCH /api/tasks/:id/complete', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('completes a task via the provider', async () => {
    const completedTask = { id: '4', title: 'Completed task', done: true };
    vi.mocked(taskProvider.completeTask).mockResolvedValue(completedTask);

    const res = await request(app)
      .patch('/api/tasks/4/complete');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(completedTask);
    expect(taskProvider.completeTask).toHaveBeenCalledWith('4');
  });
});
