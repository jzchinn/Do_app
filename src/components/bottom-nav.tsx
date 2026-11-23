import { useRouter, type Href } from 'expo-router';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/theme/colors';

type NavKey = 'home' | 'explore' | 'friends' | 'notifications' | 'messages';
type NavItem = { key: NavKey; label: string; icon: SymbolViewProps['name']; href?: Href };

const navigation: NavItem[] = [
  { key: 'home', label: 'Home', icon: { ios: 'house.fill', android: 'home', web: 'home' }, href: '/home' },
  { key: 'explore', label: 'Explore', icon: { ios: 'magnifyingglass', android: 'search', web: 'search' } },
  { key: 'friends', label: 'Friends', icon: { ios: 'person.2.fill', android: 'group', web: 'group' }, href: '/friends' },
  { key: 'notifications', label: 'Notifications', icon: { ios: 'bell', android: 'notifications', web: 'notifications' } },
  { key: 'messages', label: 'Messages', icon: { ios: 'bubble.right', android: 'chat_bubble', web: 'chat_bubble' } },
];

type Props = { active: NavKey; onPressActive?: () => void };

export function BottomNav({ active, onPressActive }: Props) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  function handlePress(item: NavItem) {
    if (item.key === active) onPressActive?.();
    else if (item.href) router.replace(item.href);
  }

  return (
    <View className="absolute left-5 right-5" style={{ bottom: Math.max(insets.bottom, 12) }}>
      <GlassView glassEffectStyle="regular" colorScheme="light" style={[styles.bar, !isLiquidGlassAvailable() && styles.barFallback]}>
        <View className="flex-row items-stretch p-1">
          {navigation.map(item => {
            const selected = item.key === active;
            const comingSoon = !item.href;
            return (
              <TouchableOpacity key={item.key} disabled={comingSoon} accessibilityRole="tab" accessibilityState={{ selected, disabled: comingSoon }} accessibilityLabel={comingSoon ? `${item.label}, coming soon` : item.label} onPress={() => handlePress(item)} activeOpacity={0.8} className={`min-h-[58px] flex-1 items-center justify-center gap-1 rounded-full py-1.5 ${selected ? 'bg-lime/60' : ''}`}>
                <SymbolView name={item.icon} size={24} tintColor={selected ? colors.forest : colors.charcoal} />
                <Text className={`font-poppins-medium text-[9px] ${selected ? 'text-forest' : 'text-charcoal'}`}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </GlassView>
      <Text className="mt-1 text-center font-poppins text-[9px] text-forest">Explore, notifications & messages coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Native glass container needs explicit view styles; all content uses NativeWind.
  bar: { borderRadius: 40, borderWidth: 1.5, borderColor: colors.background, boxShadow: '0 8px 30px rgba(25, 26, 25, 0.12)' },
  barFallback: { backgroundColor: 'rgba(244, 248, 233, 0.97)' },
});
