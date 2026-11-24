import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/theme/colors';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

type Props = { visible: boolean; value: Date | null; onSelect: (date: Date) => void; onClose: () => void };

// Calendar pop-up: today is outlined, earlier days are disabled, any later day can be picked.
export function DayPickerModal({ visible, value, onSelect, onClose }: Props) {
  const today = startOfDay(new Date());
  const [month, setMonth] = useState(() => new Date((value ?? today).getFullYear(), (value ?? today).getMonth(), 1));
  const isCurrentMonth = month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth();

  const leadingBlanks = month.getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [...Array<null>(leadingBlanks).fill(null), ...Array.from({ length: daysInMonth }, (_, index) => new Date(month.getFullYear(), month.getMonth(), index + 1))];

  const shiftMonth = (delta: number) => setMonth(current => new Date(current.getFullYear(), current.getMonth() + delta, 1));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable accessibilityLabel="Close calendar" onPress={onClose} className="flex-1 items-center justify-center bg-charcoal/40 px-5">
        {/* Inner Pressable swallows taps so only the dimmed backdrop closes the calendar. */}
        <Pressable className="w-full rounded-3xl bg-background p-5">
          <View className="mb-3 flex-row items-center justify-between">
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Previous month" disabled={isCurrentMonth} onPress={() => shiftMonth(-1)} className={`h-11 w-11 items-center justify-center rounded-full bg-surface ${isCurrentMonth ? 'opacity-30' : ''}`}>
              <SymbolView name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }} size={15} weight="bold" tintColor={colors.forest} />
            </TouchableOpacity>
            <Text accessibilityRole="header" className="font-poppins-semibold text-[17px] text-charcoal">{month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Next month" onPress={() => shiftMonth(1)} className="h-11 w-11 items-center justify-center rounded-full bg-surface">
              <SymbolView name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }} size={15} weight="bold" tintColor={colors.forest} />
            </TouchableOpacity>
          </View>
          <View className="mb-1 flex-row">
            {weekdays.map(day => <Text key={day} className="w-[14.285%] text-center font-poppins-medium text-[11px] text-forest">{day}</Text>)}
          </View>
          <View className="flex-row flex-wrap">
            {cells.map((date, index) => {
              if (!date) return <View key={`blank-${index}`} className="h-11 w-[14.285%]" />;
              const past = date < today;
              const selected = value !== null && sameDay(date, value);
              const isToday = sameDay(date, today);
              return (
                <View key={date.getDate()} className="h-11 w-[14.285%] items-center justify-center">
                  <TouchableOpacity accessibilityRole="button" accessibilityState={{ selected, disabled: past }} accessibilityLabel={date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + (isToday ? ', today' : '')} disabled={past} activeOpacity={0.8} onPress={() => { onSelect(date); onClose(); }} className={`h-10 w-10 items-center justify-center rounded-full ${selected ? 'bg-forest' : isToday ? 'border-2 border-grass bg-lime' : ''}`}>
                    <Text className={`font-poppins-medium text-[15px] ${selected ? 'text-lime' : past ? 'text-charcoal/25' : 'text-charcoal'}`}>{date.getDate()}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
