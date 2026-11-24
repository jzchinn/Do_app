import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';

import { toPostedPlan, type PlanDraft, type PlanForm, type PostedPlan } from '@/types/plan';

type Plans = {
  drafts: readonly PlanDraft[];
  posted: readonly PostedPlan[];
  // Saves a new draft, or updates the draft with this id.
  saveDraft: (form: PlanForm, id?: string) => void;
  deleteDraft: (id: string) => void;
  // Moves the plan into "My events" (and removes its draft). Returns false if a required field is empty.
  postPlan: (form: PlanForm, draftId?: string) => boolean;
};

const PlansContext = createContext<Plans | null>(null);

// Lives above the Stack so drafts and posted plans survive screens closing.
// Preview-only: these are kept in memory until the Supabase backend exists.
export function PlansProvider({ children }: { children: ReactNode }) {
  const [drafts, setDrafts] = useState<readonly PlanDraft[]>([]);
  const [posted, setPosted] = useState<readonly PostedPlan[]>([]);
  const counter = useRef(0);
  const newId = () => `${Date.now()}-${counter.current++}`;

  const saveDraft = useCallback((form: PlanForm, id?: string) => {
    setDrafts(current => (id && current.some(draft => draft.id === id) ? current.map(draft => (draft.id === id ? { id, form } : draft)) : [{ id: newId(), form }, ...current]));
  }, []);

  const deleteDraft = useCallback((id: string) => setDrafts(current => current.filter(draft => draft.id !== id)), []);

  const postPlan = useCallback((form: PlanForm, draftId?: string) => {
    const plan = toPostedPlan(form, newId());
    if (!plan) return false;
    setPosted(current => [...current, plan]);
    if (draftId) setDrafts(current => current.filter(draft => draft.id !== draftId));
    return true;
  }, []);

  const value = useMemo(() => ({ drafts, posted, saveDraft, deleteDraft, postPlan }), [drafts, posted, saveDraft, deleteDraft, postPlan]);
  return <PlansContext.Provider value={value}>{children}</PlansContext.Provider>;
}

export function usePlans() {
  const context = useContext(PlansContext);
  if (!context) throw new Error('usePlans must be used inside PlansProvider');
  return context;
}
