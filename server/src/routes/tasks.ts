import { Router } from 'express';
import { taskProvider } from '../providers/vikunja-provider';

export const tasksRouter = Router();

tasksRouter.get('/', async (req, res) => {
  try {
    const tasks = await taskProvider.getTasks();
    res.json(tasks);
  } catch (err) {
    console.error('Failed to fetch tasks:', err);
    res.status(500).json({error: 'Failed to fetch tasks' });
  }
});

tasksRouter.post('/', async (req, res) => {
  try {
    const task = await taskProvider.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    console.error('Failed to create task:', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

tasksRouter.patch('/:id', async (req, res) => {
  try {
    const task = await taskProvider.updateTask(req.params.id, req.body);
    res.json(task);
  } catch (err) {
    console.error('Failed to update task:', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

tasksRouter.patch('/:id/complete', async (req, res) => {
  try {
    const task = await taskProvider.completeTask(req.params.id);
    res.json(task);
  } catch (err) {
    console.error('Failed to complete task:', err);
    res.status(500).json({ error: 'Failed to complete task' });
  }
});
