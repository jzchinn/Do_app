import { SymbolView } from 'expo-symbols';
import { Text, TouchableOpacity, View } from 'react-native';

import type { DemoFriend, FriendList } from '@/data/demo-friends';
import { colors } from '@/theme/colors';

export const friendListColumns: { key: FriendList; label: string }[] = [
  { key: 'oneOnOne', label: '1-on-1' },
  { key: 'threePlus', label: '3+' },
  { key: 'fourPlus', label: '4+' },
];

export type FriendSort = 'name' | FriendList;

type HeaderProps = { activeSort: FriendSort; onSelect: (sort: FriendSort) => void };

function SortPill({ label, active, wide, onPress }: { label: string; active: boolean; wide?: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity accessibilityRole="button" accessibilityState={{ selected: active }} accessibilityLabel={`Sort by ${label}`} activeOpacity={0.8} hitSlop={{ top: 8, bottom: 8 }} onPress={onPress} className={`friend-header__pill ${wide ? 'friend-header__pill--wide' : ''} ${active ? 'friend-header__pill--active' : ''}`}>
      <Text className={`friend-header__label ${active ? 'friend-header__label--active' : ''}`}>{label}</Text>
    </TouchableOpacity>
  );
}

export function FriendListHeader({ activeSort, onSelect }: HeaderProps) {
  return (
    <View className="friend-header">
      <View className="friend-header__name">
        <SortPill wide label="Name" active={activeSort === 'name'} onPress={() => onSelect('name')} />
      </View>
      {friendListColumns.map(column => (
        <View key={column.key} className="friend-row__column">
          <SortPill label={column.label} active={activeSort === column.key} onPress={() => onSelect(column.key)} />
        </View>
      ))}
    </View>
  );
}

const mutedCheck = 'rgba(25, 26, 25, 0.4)';

type CircleProps = { label: string; checked: boolean; editing: boolean; wasChecked: boolean; onPress: () => void };

// View mode: gray and not tappable. Edit mode: tappable; the new choice is bright green and the old one stays gray.
function ListCircle({ label, checked, editing, wasChecked, onPress }: CircleProps) {
  const showCheck = checked || (editing && wasChecked);
  const style = !editing
    ? checked ? 'friend-row__circle--locked-on' : 'friend-row__circle--locked'
    : checked ? 'friend-row__circle--on' : wasChecked ? 'friend-row__circle--locked-on' : '';
  const circle = (
    <View className={`friend-row__circle ${style}`}>
      {showCheck && <SymbolView name={{ ios: 'checkmark', android: 'check', web: 'check' }} size={12} weight="bold" tintColor={checked && editing ? colors.background : mutedCheck} />}
    </View>
  );

  return (
    <View className="friend-row__column">
      {editing ? (
        <TouchableOpacity accessibilityRole="radio" accessibilityState={{ checked }} accessibilityLabel={label} activeOpacity={0.7} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={onPress}>{circle}</TouchableOpacity>
      ) : (
        <View accessible accessibilityLabel={`${label}: ${checked ? 'yes' : 'no'}`}>{circle}</View>
      )}
    </View>
  );
}

type RowProps = {
  friend: DemoFriend;
  editing: boolean;
  /** The choice shown right now. In edit mode this is the unsaved draft; friend.list stays the saved one. */
  selectedList: FriendList;
  onSelect: (list: FriendList) => void;
};

export function FriendRow({ friend, editing, selectedList, onSelect }: RowProps) {
  return (
    <View className="friend-row">
      <View className="friend-row__avatar">
        <SymbolView name={{ ios: 'person.fill', android: 'person', web: 'person' }} size={22} tintColor={colors.forest} />
      </View>
      <Text numberOfLines={1} className="friend-row__name">{friend.name}</Text>
      {friendListColumns.map(column => (
        <ListCircle key={column.key} label={`${friend.name}, ${column.label}`} editing={editing} checked={selectedList === column.key} wasChecked={friend.list === column.key} onPress={() => onSelect(column.key)} />
      ))}
    </View>
  );
}
