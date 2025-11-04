'use client';
import  { useState, useEffect } from 'react';
import Modal from '../ui/Modal';

export default function AddTaskModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string | null) => void;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!open) return;
    setTitle('');
    setDescription('');
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} title="Add task">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreate(title.trim(), description.trim() === '' ? null : description);
          onClose();
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
            onClick={onClose}
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
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}
