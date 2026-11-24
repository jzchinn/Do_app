import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/bottom-nav';
import { EventCard } from '@/components/event-card';
import { images } from '@/constants/images';
import { demoEvents, type DemoEvent, type EventCategory } from '@/data/demo-events';
import { usePlans } from '@/store/plans';
import { useSavedEvents } from '@/store/saved-events';
import { formatDate, formatTime, type PostedPlan } from '@/types/plan';
import { colors } from '@/theme/colors';

const categories: EventCategory[] = ['Going', 'Saved', 'Past', 'My events'];

// Posted plans show up as unresolved events with a placeholder picture until real photos exist.
function toEvent(plan: PostedPlan): DemoEvent {
  return { id: plan.id, title: plan.title, day: formatDate(plan.date), time: formatTime(plan.time), location: plan.place.name, image: images.loginBgTexture, initiallySaved: false, status: 'unresolved' };
}

const minutesOfDay = (plan: PostedPlan) => plan.time.hour * 60 + plan.time.minute;
type Props = { profileImage?: string; onOpenProfile: () => void; onCreatePlan: () => void };

export function HomeScreen({ profileImage, onOpenProfile, onCreatePlan }: Props) {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState<EventCategory>('Going');
  const { savedIds, toggleSave } = useSavedEvents();
  const { posted } = usePlans();
  const myEvents = [...posted].sort((a, b) => a.date.getTime() - b.date.getTime() || minutesOfDay(a) - minutesOfDay(b)).map(toEvent);
  const demo = demoEvents.filter(event => category === 'Going' ? event.status === 'confirmed' : category === 'Past' ? event.status === 'past' : savedIds.has(event.id));
  const events = category === 'My events' ? myEvents : demo;

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />
      <Image source={images.loginBgTexture} className="absolute left-0 top-0 h-[280px] w-full opacity-[0.08]" resizeMode="stretch" accessible={false} />
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 120 }]} showsVerticalScrollIndicator={false}>
        <View className="mb-9 flex-row items-center justify-between">
          <View className="flex-row items-start gap-1">
            <Text accessibilityRole="header" className="font-poppins-bold text-[32px] leading-[42px] text-charcoal">Home</Text>
            <SymbolView name={{ ios: 'sparkle', android: 'auto_awesome', web: 'auto_awesome' }} size={23} tintColor={colors.grass} />
          </View>
          <TouchableOpacity onPress={onCreatePlan} accessibilityRole="button" accessibilityLabel="Make a plan" activeOpacity={0.85} style={styles.planButton} className="h-14 flex-row items-center gap-2 rounded-full bg-forest pl-2 pr-3.5">
            <View className="h-9 w-9 items-center justify-center rounded-full bg-lime">
              <SymbolView name={{ ios: 'plus', android: 'add', web: 'add' }} size={20} weight="heavy" tintColor={colors.forest} />
            </View>
            <Text numberOfLines={1} className="font-poppins-bold text-[14px] text-lime">Make a plan</Text>
            <Image source={images.doCheers} tintColor={colors.lime} className="h-6 w-6" resizeMode="contain" accessible={false} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onOpenProfile} accessibilityRole="button" accessibilityLabel="Open profile" activeOpacity={0.8} className="h-11 w-11 items-center justify-center rounded-full bg-lime">
            {profileImage ? <Image source={{ uri: profileImage }} className="h-9 w-9 rounded-full" /> : <SymbolView name={{ ios: 'person.crop.circle', android: 'account_circle', web: 'account_circle' }} size={34} tintColor={colors.forest} />}
          </TouchableOpacity>
        </View>
        <View className="mb-3 flex-row items-center justify-between">
          <Text accessibilityRole="header" className="font-poppins-bold text-[22px] text-charcoal">Events</Text>
          <Text className="font-poppins-medium text-[11px] text-forest">Demo events</Text>
        </View>
        <View className="mb-5 flex-row flex-wrap gap-2" accessibilityRole="tablist">
          {categories.map(item => (
            <TouchableOpacity key={item} accessibilityRole="tab" accessibilityState={{ selected: category === item }} activeOpacity={0.8} onPress={() => setCategory(item)} className={`event-filter ${category === item ? 'bg-forest' : 'bg-surface'}`}>
              <Text className={`font-poppins-semibold text-[14px] ${category === item ? 'text-lime' : 'text-charcoal'}`}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View key={category}>
          {events.map((event, index) => (
            <View key={event.id}>
              {(index === 0 || events[index - 1].day !== event.day) && <Text className="mb-3 mt-1 font-poppins-semibold text-[14px] text-forest">{event.day}</Text>}
              <EventCard event={event} saved={savedIds.has(event.id)} onToggleSave={category === 'My events' ? undefined : () => toggleSave(event.id)} />
            </View>
          ))}
          {events.length === 0 && <View className="rounded-3xl bg-surface p-6"><Text className="font-poppins-semibold text-[17px] text-forest">{category === 'My events' ? 'Nothing posted yet' : 'Something to look forward to'}</Text><Text className="mt-2 font-poppins text-[14px] text-charcoal">{category === 'My events' ? 'Tap Make a plan to post one. It will show up here.' : 'Tap the heart on an event to keep it here. Saving is private.'}</Text></View>}
        </View>
        <Text className="mt-1 font-poppins text-[11px] leading-[17px] text-forest">Sample plans and attendees. Saves last for this preview session.</Text>
      </ScrollView>
      <BottomNav active="home" onPressActive={() => setCategory('Going')} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20 },
  // A soft green glow around the button plus a faint inner highlight, so the main action invites a press.
  planButton: { boxShadow: '0 0 18px 3px rgba(78, 159, 61, 0.55), inset 0 0 10px rgba(216, 233, 168, 0.22)' },
});
