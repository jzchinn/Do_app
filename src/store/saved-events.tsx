import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { demoEvents } from '@/data/demo-events';

type SavedEvents = { savedIds: ReadonlySet<string>; toggleSave: (id: string) => void };

const SavedEventsContext = createContext<SavedEvents | null>(null);

// Lives above the Stack so saves survive Home being unmounted when you switch tabs.
// Preview-only: the real saved events will come from Supabase.
export function SavedEventsProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<ReadonlySet<string>>(() => new Set(demoEvents.filter(event => event.initiallySaved).map(event => event.id)));

  const toggleSave = useCallback((id: string) => {
    setSavedIds(current => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ savedIds, toggleSave }), [savedIds, toggleSave]);
  return <SavedEventsContext.Provider value={value}>{children}</SavedEventsContext.Provider>;
}

export function useSavedEvents() {
  const context = useContext(SavedEventsContext);
  if (!context) throw new Error('useSavedEvents must be used inside SavedEventsProvider');
  return context;
}
