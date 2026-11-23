import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EventCard } from '@/components/event-card';
import { images } from '@/constants/images';
import { demoEvents, type EventCategory } from '@/data/demo-events';
import { colors } from '@/theme/colors';

const categories: EventCategory[] = ['Going', 'Saved', 'Past'];
const navigation: { label: string; icon: SymbolViewProps['name'] }[] = [
  { label: 'Home', icon: { ios: 'house.fill', android: 'home', web: 'home' } },
  { label: 'Explore', icon: { ios: 'magnifyingglass', android: 'search', web: 'search' } },
  { label: 'Notifications', icon: { ios: 'bell', android: 'notifications', web: 'notifications' } },
  { label: 'Messages', icon: { ios: 'bubble.right', android: 'chat_bubble', web: 'chat_bubble' } },
];

type Props = { profileImage?: string; onOpenProfile: () => void };

export function HomeScreen({ profileImage, onOpenProfile }: Props) {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState<EventCategory>('Going');
  const [savedIds, setSavedIds] = useState(() => new Set(demoEvents.filter(event => event.initiallySaved).map(event => event.id)));
  const events = demoEvents.filter(event => category === 'Going' ? event.status === 'confirmed' : category === 'Past' ? event.status === 'past' : savedIds.has(event.id));

  function toggleSave(id: string) {
    setSavedIds(current => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

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
          <TouchableOpacity onPress={onOpenProfile} accessibilityRole="button" accessibilityLabel="Open profile" activeOpacity={0.8} className="h-11 w-11 items-center justify-center rounded-full bg-lime">
            {profileImage ? <Image source={{ uri: profileImage }} className="h-9 w-9 rounded-full" /> : <SymbolView name={{ ios: 'person.crop.circle', android: 'account_circle', web: 'account_circle' }} size={34} tintColor={colors.forest} />}
          </TouchableOpacity>
        </View>
        <View className="mb-3 flex-row items-center justify-between">
          <Text accessibilityRole="header" className="font-poppins-bold text-[22px] text-charcoal">Events</Text>
          <Text className="font-poppins-medium text-[11px] text-forest">Demo events</Text>
        </View>
        <View className="mb-5 flex-row flex-wrap gap-2.5" accessibilityRole="tablist">
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
              <EventCard event={event} saved={savedIds.has(event.id)} onToggleSave={() => toggleSave(event.id)} />
            </View>
          ))}
          {events.length === 0 && <View className="rounded-3xl bg-surface p-6"><Text className="font-poppins-semibold text-[17px] text-forest">Something to look forward to</Text><Text className="mt-2 font-poppins text-[14px] text-charcoal">Tap the heart on an event to keep it here. Saving is private.</Text></View>}
        </View>
        <Text className="mt-1 font-poppins text-[11px] leading-[17px] text-forest">Sample plans and attendees. Saves last for this preview session.</Text>
      </ScrollView>
      <View className="absolute left-5 right-5" style={{ bottom: Math.max(insets.bottom, 12) }}>
        <GlassView glassEffectStyle="regular" colorScheme="light" style={[styles.bar, !isLiquidGlassAvailable() && styles.barFallback]}>
          <View className="flex-row items-stretch p-1">
            {navigation.map((item, index) => (
              <TouchableOpacity key={item.label} disabled={index !== 0} accessibilityRole="tab" accessibilityState={{ selected: index === 0, disabled: index !== 0 }} accessibilityLabel={index === 0 ? 'Home' : `${item.label}, coming soon`} onPress={() => setCategory('Going')} activeOpacity={0.8} className={`min-h-[58px] flex-1 items-center justify-center gap-1 rounded-full py-1.5 ${index === 0 ? 'bg-lime/60' : ''}`}>
                <SymbolView name={item.icon} size={24} tintColor={index === 0 ? colors.forest : colors.charcoal} />
                <Text className={`font-poppins-medium text-[9px] ${index === 0 ? 'text-forest' : 'text-charcoal'}`}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </GlassView>
        <Text className="mt-1 text-center font-poppins text-[9px] text-forest">Explore, notifications & messages coming soon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20 },
  // Native glass container needs explicit view styles; all content uses NativeWind.
  bar: { borderRadius: 40, borderWidth: 1.5, borderColor: colors.background, boxShadow: '0 8px 30px rgba(25, 26, 25, 0.12)' },
  barFallback: { backgroundColor: 'rgba(244, 248, 233, 0.97)' },
});
