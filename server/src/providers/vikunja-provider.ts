import type { Task, TaskProvider } from '@denizen/shared';

const VIKUNJA_URL = process.env.VIKUNJA_URL;
const VIKUNJA_TOKEN = process.env.VIKUNJA_TOKEN;

function mapVikunjaTask(vTask: any): Task {
  return {
    id: String(vTask.id),
    title: vTask.title,
    done: vTask.done,
    dueDate: vTask.due_date,
    projectId: String(vTask.project_id),
  };
}

function mapTaskToVikunjaFields(input: Partial<Task>): Record<string, unknown> {
  const fields: Record<string, unknown> = {};
  if (input.title !== undefined) fields.title = input.title;
  if (input.done !== undefined) fields.done = input.done;
  if (input.dueDate !== undefined) fields.due_date = input.dueDate;
  if (input.projectId !== undefined) fields.project_id = input.projectId;
  return fields;
}

class VikunjaProvider implements TaskProvider {
  private async request(path: string, options: RequestInit = {}) {
    const res = await fetch(`${VIKUNJA_URL}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${VIKUNJA_TOKEN}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!res.ok) {
      throw new Error(`Vikunja request failed: ${res.status} ${res.statusText}`);
    }
    return res.json();
  }

  async getTasks(): Promise<Task[]> {
    const data = await this.request(`/api/v2/tasks`);
    return data.items.map(mapVikunjaTask);
  }

  async createTask(input: Partial<Task>): Promise<Task> {
    const data = await this.request(`/api/v2/projects/${input.projectId}/tasks`, {
      method: 'POST',
      body: JSON.stringify({ title: input.title }),
    });
    return mapVikunjaTask(data);
  }

  async updateTask(id: string, input: Partial<Task>): Promise<Task> {
    const data = await this.request(`/api/v2/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(mapTaskToVikunjaFields(input)),
    });
    return mapVikunjaTask(data);
  }

  async completeTask(id: string): Promise<Task> {
    return this.updateTask(id, { done: true });
  }
}

export const taskProvider: TaskProvider = new VikunjaProvider();
