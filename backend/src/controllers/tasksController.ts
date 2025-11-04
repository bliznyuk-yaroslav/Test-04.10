import { Response } from 'express';
import { prisma } from '../db/prisma';
import { AuthRequest } from '../middlewares/auth';

const normalizeStatus = (s?: string | null) => {
  if (!s) return undefined;
  const v = s.toLowerCase();
  if (v === 'in progress' || v === 'in_progress') return 'in_progress' as const;
  if (v === 'todo') return 'todo' as const;
  if (v === 'done') return 'done' as const;
  return undefined;
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status } = req.body as {
      title?: string;
      description?: string | null;
      status?: 'todo' | 'in progress' | 'in_progress' | 'done';
    };
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const task = await prisma.task.create({
      data: {
        title,
        description: description ?? null,
        status: normalizeStatus(status) ?? 'todo',
        userId: req.user!.id,
      },
    });
    return res.status(201).json(task);
  } catch (e) {
    return res.status(500).json({ message: 'Failed to create task' });
  }
};

export const listTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query as { status?: string };
    const where: any = { userId: req.user!.id };
    const ns = normalizeStatus(status);
    if (ns) where.status = ns;
    const tasks = await prisma.task.findMany({ where, orderBy: { createdAt: 'desc' } });
    return res.json(tasks);
  } catch (e) {
    return res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.task.findFirst({ where: { id, userId: req.user!.id } });
    if (!existing) return res.status(404).json({ message: 'Not found' });
    const { title, description, status } = req.body as {
      title?: string;
      description?: string | null;
      status?: 'todo' | 'in progress' | 'in_progress' | 'done';
    };
    const updated = await prisma.task.update({
      where: { id: existing.id },
      data: {
        title,
        description,
        status: normalizeStatus(status),
      },
    });
    return res.json(updated);
  } catch (e) {
    return res.status(500).json({ message: 'Failed to update task' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.task.findFirst({ where: { id, userId: req.user!.id } });
    if (!existing) return res.status(404).json({ message: 'Not found' });
    await prisma.task.delete({ where: { id: existing.id } });
    return res.status(204).send();
  } catch (e) {
    return res.status(500).json({ message: 'Failed to delete task' });
  }
};
