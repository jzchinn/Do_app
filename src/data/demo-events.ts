import { images } from '@/constants/images';

export type EventCategory = 'Going' | 'Saved' | 'Past' | 'My events';

type EventBase = {
  id: string;
  title: string;
  day: string;
  time: string;
  location: string;
  image: typeof images.homeTennis;
  initiallySaved: boolean;
};

// Synthetic fixtures only. Unresolved events deliberately cannot contain attendees.
export type DemoEvent = EventBase & (
  | { status: 'confirmed' | 'past'; attendees: readonly string[] }
  | { status: 'unresolved'; attendees?: never }
);

export const demoEvents: readonly DemoEvent[] = [
  { id: 'tennis', title: 'A little tennis, a little sunshine', day: 'Tomorrow', time: '9:00 AM', location: 'Rancho Cienega courts', image: images.homeTennis, initiallySaved: false, status: 'confirmed', attendees: ['You', 'Alex', 'Sam', 'Jo'] },
  { id: 'picnic', title: 'A picnic with no particular plans', day: 'This weekend', time: '12:30 PM', location: 'Griffith Park', image: images.homePicnic, initiallySaved: false, status: 'confirmed', attendees: ['You', 'Maya', 'Ben'] },
  { id: 'games', title: 'Board games & good company', day: 'Next week', time: '7:00 PM', location: 'The neighborhood café', image: images.homeGames, initiallySaved: true, status: 'unresolved' },
  { id: 'park', title: 'An afternoon in the park', day: 'Next weekend', time: '2:00 PM', location: 'Echo Park', image: images.homePicnic, initiallySaved: true, status: 'unresolved' },
  { id: 'doubles', title: 'Sunday morning doubles', day: 'Last weekend', time: '10:00 AM', location: 'Riverside tennis courts', image: images.homeTennis, initiallySaved: false, status: 'past', attendees: ['You', 'Alex', 'Maya', 'Jo'] },
  { id: 'game-night', title: 'One more round?', day: 'Last week', time: '6:30 PM', location: 'The neighborhood café', image: images.homeGames, initiallySaved: false, status: 'past', attendees: ['You', 'Sam', 'Ben'] },
];
