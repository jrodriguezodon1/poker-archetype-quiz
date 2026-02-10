'use client';

import { Action, ActionLabel } from '@/lib/types';
import { ActionButton } from '@/components/ui/ActionButton';

interface ActionBarProps {
  labels: ActionLabel;
  selected: Action | null;
  onAction: (action: Action) => void;
}

export function ActionBar({ labels, selected, onAction }: ActionBarProps) {
  // If fold and call have the same label (e.g. both "Check"), combine them
  const foldAndCallSame = labels.fold === labels.call;

  if (foldAndCallSame) {
    return (
      <div className="flex gap-3">
        <ActionButton
          action="fold"
          label={labels.fold}
          selected={selected === 'fold' || selected === 'call'}
          onClick={() => onAction('fold')}
        />
        <ActionButton
          action="raise"
          label={labels.raise}
          selected={selected === 'raise'}
          onClick={() => onAction('raise')}
        />
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <ActionButton
        action="fold"
        label={labels.fold}
        selected={selected === 'fold'}
        onClick={() => onAction('fold')}
      />
      <ActionButton
        action="call"
        label={labels.call}
        selected={selected === 'call'}
        onClick={() => onAction('call')}
      />
      <ActionButton
        action="raise"
        label={labels.raise}
        selected={selected === 'raise'}
        onClick={() => onAction('raise')}
      />
    </div>
  );
}
