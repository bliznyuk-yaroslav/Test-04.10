'use client';
import React, { useMemo } from 'react';
import { Task } from '../../lib/api';
import {
  KanbanProvider,
  KanbanBoard,
  KanbanHeader,
  KanbanCards,
  KanbanCard,
} from '../ui/shadcn-io/kanban';
import TaskCard from '../TaskCard';

export type DndBoardProps = {
  items: Task[];
  onMove: (t: Task, status: Task['status']) => void;
  onDelete: (t: Task) => void;
  onUpdate: (t: Task, data: Partial<Pick<Task, 'title' | 'description' | 'status'>>) => void;
  visibleColumns?: Array<Task['status']>;
};

const DndBoard: React.FC<DndBoardProps> = ({
  items,
  onMove,
  onDelete,
  onUpdate,
  visibleColumns,
}) => {
  const columns = useMemo(
    () =>
      [
        { id: 'todo', name: 'To do' },
        { id: 'in_progress', name: 'In progress' },
        { id: 'done', name: 'Done' },
      ] as Array<{ id: Task['status']; name: string }>,
    [],
  );

  const kanbanData = useMemo(
    () => items.map((t: Task) => ({ id: String(t.id), name: t.title, column: t.status })),
    [items],
  );

  return (
    <KanbanProvider
      id="kanban"
      className="mt-4"
      columns={columns}
      data={kanbanData}
      onDataChange={(data: Array<{ id: string; name: string; column: string }>) => {
        const byId = new Map<string, Task>(items.map((t: Task) => [String(t.id), t] as const));
        for (const d of data) {
          const existing = byId.get(d.id);
          if (!existing) continue;
          const nextColumn = d.column as Task['status'];
          if (existing.status !== nextColumn) {
            onMove(existing, nextColumn);
          }
        }
      }}
    >
      {(col) =>
        visibleColumns && !visibleColumns.includes(col.id as Task['status']) ? null : (
          <KanbanBoard key={col.id} id={col.id}>
            <KanbanHeader>{col.name}</KanbanHeader>
            <KanbanCards id={col.id}>
              {(item) => {
                const taskId = Number(item.id);
                const task = items.find((t) => t.id === taskId);
                if (!task) return null;
                return (
                  <KanbanCard key={item.id} id={item.id} name={item.name} column={item.column}>
                    <TaskCard task={task} onDelete={onDelete} onUpdate={onUpdate} />
                  </KanbanCard>
                );
              }}
            </KanbanCards>
          </KanbanBoard>
        )
      }
    </KanbanProvider>
  );
};

export default DndBoard;
