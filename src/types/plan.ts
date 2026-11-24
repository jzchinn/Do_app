// A real place from a map search, so the plan can later send a map pin to attendees.
export type Place = { id: string; name: string; address: string; latitude: number; longitude: number };

// 24-hour clock internally; the picker shows 12-hour. Minutes are 0, 15, 30 or 45.
export type PlanTime = { hour: number; minute: number };

export const MIN_GROUP_SIZE = 2;
// 10 stands for "10+".
export const MAX_GROUP_SIZE = 10;

export type PlanForm = {
  category: string | null;
  title: string;
  // True once the person types their own title, so choosing a category or place stops overwriting it.
  titleEdited: boolean;
  date: Date | null;
  time: PlanTime | null;
  place: Place | null;
  size: number;
  flexible: boolean;
  minSize: number;
  maxSize: number;
};

export const emptyPlanForm: PlanForm = { category: null, title: '', titleEdited: false, date: null, time: null, place: null, size: 4, flexible: false, minSize: 4, maxSize: 4 };

export function formatSize(size: number) {
  return size >= MAX_GROUP_SIZE ? `${MAX_GROUP_SIZE}+` : String(size);
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function formatTime({ hour, minute }: PlanTime) {
  return `${hour % 12 === 0 ? 12 : hour % 12}:${String(minute).padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`;
}

// Suggested title, like "Drinks at The Roosevelt". Fills in as the category and place are chosen.
export function autoTitle(category: string | null, place: Place | null) {
  if (!category) return '';
  return place ? `${category} at ${place.name}` : category;
}

// A saved-for-later plan. The whole form is kept, so it reopens exactly as it was left.
export type PlanDraft = { id: string; form: PlanForm };

// A plan that has been posted: every required field is filled in.
export type PostedPlan = {
  id: string;
  category: string;
  title: string;
  date: Date;
  time: PlanTime;
  place: Place;
  size: number;
  minSize: number;
  maxSize: number;
};

// Returns null while a required field is still empty.
export function toPostedPlan(form: PlanForm, id: string): PostedPlan | null {
  const { category, date, time, place } = form;
  const title = form.title.trim();
  if (!category || !date || !time || !place || !title) return null;
  return { id, category, title, date, time, place, size: form.size, minSize: form.flexible ? form.minSize : form.size, maxSize: form.flexible ? form.maxSize : form.size };
}
