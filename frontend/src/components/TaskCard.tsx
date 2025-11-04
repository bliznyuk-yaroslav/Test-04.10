'use client';
import { useState } from 'react';
import { Task } from '../lib/api';
import Modal from './ui/Modal';

export default function TaskCard({
  task,
  onDelete,
  onUpdate,
}: {
  task: Task;
  onDelete: (t: Task) => void;
  onUpdate: (t: Task, data: Partial<Pick<Task, 'title' | 'description' | 'status'>>) => void;
}) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? '');
  return (
    <article className="rounded border border-purple-800 p-3 bg-zinc-900/70 text-zinc-100">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-medium text-zinc-100">{task.title}</h3>
          {task.description && <p className="text-sm text-zinc-200">{task.description}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            draggable={false}
            data-no-dnd="true"
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="text-xs px-2 py-1 rounded border border-purple-700 hover:bg-purple-900/50 transition-colors"
          >
            Details
          </button>
          <button
            type="button"
            draggable={false}
            data-no-dnd="true"
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task);
            }}
            className="text-xs text-red-400 hover:text-red-300 border border-purple-700 px-2 py-1 rounded "
          >
            Delete
          </button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(false);
        }}
        title="Task details"
      >
        {!editing ? (
          <>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-purple-300">Title:</span> {task.title}
              </div>
              {task.description && (
                <div>
                  <span className="text-purple-300">Description:</span> {task.description}
                </div>
              )}
              <div>
                <span className="text-purple-300">Status:</span> {task.status.replace('_', ' ')}
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="px-3 py-1 rounded border border-purple-700 text-zinc-200 hover:bg-purple-900/50"
                onClick={() => setEditing(true)}
                data-no-dnd="true"
              >
                Edit
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white"
                data-no-dnd="true"
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const payload: Partial<Pick<Task, 'title' | 'description'>> = {
                title: title.trim(),
                description: description.trim() === '' ? null : description,
              } as any;
              onUpdate(task, payload);
              setEditing(false);
              setOpen(false);
            }}
            className="space-y-3"
          >
            <div>
              <label className="block mb-1 text-sm text-zinc-200">Title</label>
              <input
                className="w-full rounded border px-3 py-2 bg-zinc-900 text-zinc-100 border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                data-no-dnd="true"
                autoFocus
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-zinc-200">Description</label>
              <input
                className="w-full rounded border px-3 py-2 bg-zinc-900 text-zinc-100 border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional"
                data-no-dnd="true"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                }}
                className="px-3 py-1 rounded border border-purple-700 text-zinc-200 hover:bg-purple-900/50"
                data-no-dnd="true"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white"
                data-no-dnd="true"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </Modal>
    </article>
  );
}
