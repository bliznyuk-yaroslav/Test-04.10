'use client';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export default function Modal({ open, onClose, children, title }: ModalProps) {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape and lock scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" data-no-dnd="true">
      <div className="absolute inset-0 bg-black/50 z-[1]" onClick={onClose} />
      <div
        className="relative z-[2] w-full max-w-md rounded-lg bg-zinc-950 border border-purple-800 shadow p-4 text-zinc-100"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        data-no-dnd="true"
      >
        <div className="flex items-center justify-between mb-2">
          {title ? <h3 className="text-lg font-semibold text-zinc-100">{title}</h3> : <span />}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="h-7 w-7 inline-flex items-center justify-center rounded border border-purple-700 text-zinc-200 hover:bg-purple-900/50"
            data-no-dnd="true"
          >
            ×
          </button>
        </div>
        <div data-no-dnd="true">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
