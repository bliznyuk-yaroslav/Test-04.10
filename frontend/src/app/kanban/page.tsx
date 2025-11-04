'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchTasks,
  createTaskThunk,
  updateTaskThunk,
  deleteTaskThunk,
} from '../../store/slices/tasksSlice';
import { Task } from '../../lib/api';
import DndBoard from '../../components/kanban/DndBoard';
import FilterBar from '../../components/kanban/FilterBar';
import AddTaskModal from '../../components/kanban/AddTaskModal';
import type { RootState } from '../../store';
import toast from "react-hot-toast";


export default function KanbanPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s: RootState) => s.tasks);
  const { token } = useAppSelector((s: RootState) => s.auth);
  const [filter, setFilter] = useState<'all' | 'todo' | 'in_progress' | 'done'>('all');

  useEffect(() => {
    if (!token) {
      router.replace('/login');
      return;
    }
    dispatch(fetchTasks(filter === 'all' ? undefined : filter));
  }, [token, filter]);



  const [openAdd, setOpenAdd] = useState(false);



  const setStatus = (t: Task, status: Task['status']) => {
    dispatch(updateTaskThunk({ id: t.id, data: { status } }));
  };

  const remove = async (t: Task) => {
    try {
      await dispatch(deleteTaskThunk(t.id)).unwrap();
      toast.success('Task deleted successfully!');
    } catch (e) {
      toast.error('Failed to delete task');
    }
  };

  const update = (t: Task, data: Partial<Pick<Task, 'title' | 'description' | 'status'>>) => {
    dispatch(updateTaskThunk({ id: t.id, data }));
  };

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-zinc-100 font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" />
          <div className="text-sm text-zinc-300">Loading…</div>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen p-0 bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-zinc-100 font-sans">
      <div className="px-6 p-4 flex items-center justify-between gap-3">
        <FilterBar value={filter} onChange={setFilter} />
        <button
          onClick={() => setOpenAdd(true)}
          className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 text-white transition-colors"
        >
          Add task
        </button>
      </div>

      {error && <p className="text-sm text-red-400 mt-4">{error}</p>}

      <div className="px-6 mt-4">
        <DndBoard
          items={items}
          onMove={setStatus}
          onDelete={remove}
          onUpdate={update}
          visibleColumns={filter === 'all' ? undefined : [filter]}
        />
      </div>

      <AddTaskModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onCreate={async (t, d) => {
          try {
            await dispatch(
              createTaskThunk({ title: t, description: d, status: 'todo' })
            ).unwrap();
            toast.success('Task created successfully!');
          } catch (e) {
            toast.error('Failed to create task');
          }
        }}
      />
    </main>
  );
}
