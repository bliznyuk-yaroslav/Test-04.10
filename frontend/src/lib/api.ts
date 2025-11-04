const API_URL ='https://test-04-10.onrender.com';

const headers = () => {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (typeof window !== 'undefined') {
    const t = localStorage.getItem('token');
    if (t) h['Authorization'] = `Bearer ${t}`;
  }
  return h;
};

export type Task = {
  id: number;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'done';
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export const api = {
  async register(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Register failed');
    return res.json() as Promise<{ token: string }>;
  },

  async login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json() as Promise<{ token: string }>;
  },

  async getTasks(status?: string) {
    const q = status ? `?status=${encodeURIComponent(status)}` : '';
    const res = await fetch(`${API_URL}/tasks${q}`, {
      headers: headers(),
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to load tasks');
    return res.json() as Promise<Task[]>;
  },

  async createTask(data: { title: string; description?: string | null; status?: Task['status'] }) {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create task');
    return res.json() as Promise<Task>;
  },

  async updateTask(id: number, data: Partial<Pick<Task, 'title' | 'description' | 'status'>>) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return res.json() as Promise<Task>;
  },

  async deleteTask(id: number) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: headers(),
    });
    if (!res.ok) throw new Error('Failed to delete task');
    return true;
  },
};
