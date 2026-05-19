'use client';

import React, { useTransition } from 'react';
import { deletePropertyAction } from '@/app/actions/properties';
import { Trash2, Loader2 } from 'lucide-react';

interface DeletePropertyButtonProps {
  slug: string;
  title: string;
}

export function DeletePropertyButton({ slug, title }: DeletePropertyButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      startTransition(async () => {
        try {
          await deletePropertyAction(slug);
        } catch (error) {
          alert(error instanceof Error ? error.message : 'Failed to delete property');
        }
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-muted-foreground hover:text-red-400 transition-colors disabled:opacity-50"
      title="Delete Property"
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={16} />
      ) : (
        <Trash2 size={16} />
      )}
    </button>
  );
}
