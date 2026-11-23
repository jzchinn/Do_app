export type FriendList = 'oneOnOne' | 'threePlus' | 'fourPlus';

export type DemoFriend = {
  id: string;
  name: string;
  /** The one private list this friend is on (fixture value, read-only for now). */
  list: FriendList;
};

// Synthetic fixtures only. Real friends and private lists will live in Supabase.
export const demoFriends: readonly DemoFriend[] = [
  { id: 'alex', name: 'Alex Rivera', list: 'oneOnOne' },
  { id: 'avery', name: 'Avery Kim', list: 'threePlus' },
  { id: 'ben', name: 'Ben Carter', list: 'oneOnOne' },
  { id: 'chloe', name: 'Chloe Nguyen', list: 'fourPlus' },
  { id: 'dana', name: 'Dana Brooks', list: 'oneOnOne' },
  { id: 'eli', name: 'Eli Johnson', list: 'threePlus' },
  { id: 'farah', name: 'Farah Ahmed', list: 'oneOnOne' },
  { id: 'gabe', name: 'Gabe Torres', list: 'fourPlus' },
  { id: 'hana', name: 'Hana Sato', list: 'oneOnOne' },
  { id: 'isaac', name: 'Isaac Cohen', list: 'threePlus' },
  { id: 'jo', name: 'Jo Martinez', list: 'oneOnOne' },
  { id: 'kai', name: 'Kai Anderson', list: 'threePlus' },
  { id: 'lena', name: 'Lena Fischer', list: 'oneOnOne' },
  { id: 'maya', name: 'Maya Patel', list: 'oneOnOne' },
  { id: 'noah', name: 'Noah Williams', list: 'fourPlus' },
  { id: 'olive', name: 'Olive Grant', list: 'threePlus' },
  { id: 'priya', name: 'Priya Shah', list: 'oneOnOne' },
  { id: 'quinn', name: 'Quinn Murphy', list: 'threePlus' },
  { id: 'sam', name: 'Sam Okafor', list: 'oneOnOne' },
  { id: 'tess', name: 'Tess Walker', list: 'threePlus' },
];
