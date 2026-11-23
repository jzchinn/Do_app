import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/bottom-nav';
import { FriendListHeader, FriendRow, friendListColumns, type FriendSort } from '@/components/friend-row';
import { images } from '@/constants/images';
import { demoFriends, type DemoFriend, type FriendList } from '@/data/demo-friends';
import { colors } from '@/theme/colors';

// Name sorts A–Z. A list puts that group first, the others follow in column order, and names are A–Z within each group.
function sortFriends(friends: readonly DemoFriend[], sort: FriendSort, listOf: (friend: DemoFriend) => FriendList) {
  if (sort === 'name') return [...friends].sort((a, b) => a.name.localeCompare(b.name));
  const order = [sort, ...friendListColumns.map(column => column.key).filter(key => key !== sort)];
  return [...friends].sort((a, b) => order.indexOf(listOf(a)) - order.indexOf(listOf(b)) || a.name.localeCompare(b.name));
}

export function FriendsScreen() {
  const insets = useSafeAreaInsets();
  const [activeSort, setActiveSort] = useState<FriendSort>('oneOnOne');
  const friends = demoFriends; // active list; becomes real data later
  // Saved-but-not-active new list (by friend id), or null. The real 24-hour timer comes later.
  const [pending, setPending] = useState<Record<string, FriendList> | null>(null);
  // null = viewing. While editing, holds unsaved choices by friend id.
  const [draft, setDraft] = useState<Record<string, FriendList> | null>(null);
  const editing = draft !== null;
  const [showEditsFirst, setShowEditsFirst] = useState(false);

  // Editing starts from the pending list if there is one, otherwise from the active list.
  const startList = (friend: DemoFriend) => pending?.[friend.id] ?? friend.list;
  // Outside edit mode the screen always shows the current (active) list, never the pending one.
  const selectedList = (friend: DemoFriend) => (draft ? draft[friend.id] ?? startList(friend) : friend.list);
  // An edit is any friend whose choice differs from where this edit session started.
  const hasEdits = friends.some(friend => selectedList(friend) !== startList(friend));
  // Rows keep their starting order while editing so they don't jump around under your finger.
  const sortedByList = sortFriends(friends, activeSort, editing ? startList : friend => friend.list);
  // "Show edits first" is the master sort: friends changed from the current list (gray vs green) go on top.
  const isChanged = (friend: DemoFriend) => selectedList(friend) !== friend.list;
  const sorted = editing && showEditsFirst ? [...sortedByList.filter(isChanged), ...sortedByList.filter(friend => !isChanged(friend))] : sortedByList;

  function handleUpdate() {
    const changed = friends.some(friend => selectedList(friend) !== startList(friend));
    if (changed) setPending(Object.fromEntries(friends.map(friend => [friend.id, selectedList(friend)])));
    setDraft(null);
  }

  function handleCancelNewList() {
    setPending(null);
    setDraft(null);
  }

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />
      <Image source={images.loginBgTexture} className="absolute left-0 top-0 h-[280px] w-full opacity-[0.08]" resizeMode="stretch" accessible={false} />
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 120 }]} showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between">
          <Text accessibilityRole="header" className="font-poppins-bold text-[32px] leading-[42px] text-charcoal">Friends</Text>
          {!editing && (
            <TouchableOpacity accessibilityRole="button" accessibilityLabel={pending ? 'Edit / View new list' : 'Edit'} activeOpacity={0.8} onPress={() => { setShowEditsFirst(false); setDraft({}); }} className="friends-edit">
              <SymbolView name={{ ios: 'pencil', android: 'edit', web: 'edit' }} size={14} weight="semibold" tintColor={colors.forest} />
              <Text className="font-poppins-semibold text-[14px] text-forest">{pending ? 'Edit / View new list' : 'Edit'}</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text className="mb-4 font-poppins-medium text-[13px] text-forest">{pending ? 'New list in X hrs' : 'No new list pending'}</Text>
        {editing && (
          <>
            <View className="mb-3 gap-2">
              <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={handleUpdate} className="friends-confirm friends-confirm--primary self-start">
                <SymbolView name={{ ios: 'checkmark', android: 'check', web: 'check' }} size={13} weight="bold" tintColor={colors.lime} />
                <Text className="font-poppins-semibold text-[13px] text-lime">Confirm</Text>
              </TouchableOpacity>
              <View className="flex-row gap-2">
                <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={handleCancelNewList} className="friends-confirm">
                  <SymbolView name={{ ios: 'xmark', android: 'close', web: 'close' }} size={13} weight="semibold" tintColor={colors.charcoal} />
                  <Text className="font-poppins-medium text-[13px] text-charcoal">Cancel new list</Text>
                </TouchableOpacity>
                {/* Always laid out (just invisible until there is an edit) so nothing shifts when it appears. */}
                <TouchableOpacity accessibilityRole="button" disabled={!hasEdits} accessibilityElementsHidden={!hasEdits} importantForAccessibility={hasEdits ? 'yes' : 'no-hide-descendants'} activeOpacity={0.8} onPress={() => setDraft(null)} className={`friends-confirm ${hasEdits ? '' : 'opacity-0'}`}>
                  <SymbolView name={{ ios: 'arrow.uturn.backward', android: 'undo', web: 'undo' }} size={13} weight="semibold" tintColor={colors.charcoal} />
                  <Text className="font-poppins-medium text-[13px] text-charcoal">Discard new edits</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity accessibilityRole="button" accessibilityState={{ selected: showEditsFirst }} activeOpacity={0.8} onPress={() => setShowEditsFirst(current => !current)} className={`friends-toggle ${showEditsFirst ? 'friends-toggle--active' : ''}`}>
              <Text className={`font-poppins-semibold text-[13px] ${showEditsFirst ? 'text-lime' : 'text-forest'}`}>Show edits first</Text>
            </TouchableOpacity>
          </>
        )}
        <FriendListHeader activeSort={activeSort} onSelect={setActiveSort} />
        {sorted.map(friend => (
          <FriendRow key={friend.id} friend={friend} editing={editing} selectedList={selectedList(friend)} onSelect={list => setDraft(current => (current ? { ...current, [friend.id]: list } : current))} />
        ))}
        <Text className="mt-4 font-poppins text-[11px] leading-[17px] text-forest">Sample friends. Changes last for this preview session.</Text>
      </ScrollView>
      <BottomNav active="friends" />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20 },
});
