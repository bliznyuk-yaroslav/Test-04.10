import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().allow(null, '').optional(),
  status: Joi.string().valid('todo', 'in progress', 'in_progress', 'done').optional(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(255).optional(),
  description: Joi.string().allow(null, '').optional(),
  status: Joi.string().valid('todo', 'in progress', 'in_progress', 'done').optional(),
}).min(1);
