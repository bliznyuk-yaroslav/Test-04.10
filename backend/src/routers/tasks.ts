import { Router } from 'express';
import { createTask, listTasks, updateTask, deleteTask } from '../controllers/tasksController';
import { validateBody } from '../middlewares/validateBody';
import isValid from '../middlewares/isValid';
import { createTaskSchema, updateTaskSchema } from '../schemas/tasks';

const router = Router();

router.post('/', validateBody(createTaskSchema), createTask);
router.get('/', listTasks);
router.put('/:id', isValid, validateBody(updateTaskSchema), updateTask);
router.delete('/:id', isValid, deleteTask);

export default router;
