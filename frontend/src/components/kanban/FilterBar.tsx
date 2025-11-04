'use client';
type Filter = 'all' | 'todo' | 'in_progress' | 'done';

export default function FilterBar({
  value,
  onChange,
}: {
  value: Filter;
  onChange: (v: Filter) => void;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-zinc-300">Filter:</span>
      <div className="inline-flex rounded-md border border-purple-800 overflow-hidden">
        <button
          type="button"
          onClick={() => onChange('all')}
          className={`px-3 py-1 ${value === 'all' ? 'bg-purple-700 text-white' : 'text-zinc-200 hover:bg-purple-900/50'}`}
        >
          All tasks
        </button>
        <button
          type="button"
          onClick={() => onChange('todo')}
          className={`px-3 py-1 border-l border-purple-800 ${value === 'todo' ? 'bg-purple-700 text-white' : 'text-zinc-200 hover:bg-purple-900/50'}`}
        >
          To do
        </button>
        <button
          type="button"
          onClick={() => onChange('in_progress')}
          className={`px-3 py-1 border-l border-purple-800 ${value === 'in_progress' ? 'bg-purple-700 text-white' : 'text-zinc-200 hover:bg-purple-900/50'}`}
        >
          In progress
        </button>
        <button
          type="button"
          onClick={() => onChange('done')}
          className={`px-3 py-1 border-l border-purple-800 ${value === 'done' ? 'bg-purple-700 text-white' : 'text-zinc-200 hover:bg-purple-900/50'}`}
        >
          Done
        </button>
      </div>
    </div>
  );
}
