import { SymbolView } from 'expo-symbols';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import type { DemoEvent } from '@/data/demo-events';
import { colors } from '@/theme/colors';

type Props = { event: DemoEvent; saved: boolean; onToggleSave?: () => void };

export function EventCard({ event, saved, onToggleSave }: Props) {
  return (
    <View className="event-card">
      <View className="flex-row items-start gap-4">
        <View className="min-w-0 flex-1">
          <Text className="event-card__title">{event.title}</Text>
          <Text className="event-card__detail mt-2">{event.day} · {event.time}</Text>
          <Text className="event-card__detail">{event.location}</Text>
        </View>
        <Image source={event.image} className="h-[84px] w-[137px] rounded-[18px]" resizeMode="cover" accessible={false} />
      </View>
      <View className="mt-4 flex-row items-center justify-between gap-2">
        {event.status === 'unresolved' ? (
          <View className="flex-1 flex-row items-center gap-2">
            <SymbolView name={{ ios: 'lock', android: 'lock', web: 'lock' }} size={17} tintColor={colors.forest} />
            <Text className="flex-1 font-poppins-medium text-[12px] text-forest">Interest stays private</Text>
          </View>
        ) : (
          <View className="flex-1 flex-row flex-wrap items-center gap-2" accessibilityLabel={`${event.attendees.join(', ')}. ${event.attendees.length} ${event.status === 'past' ? 'went' : 'going'}. Demo attendees.`} accessible>
            <View className="flex-row" aria-hidden>
              {event.attendees.slice(0, 3).map((name, index) => (
                <View key={name} className={`h-7 w-7 items-center justify-center rounded-full border-2 border-background ${index > 0 ? '-ml-1.5' : ''} ${index === 1 ? 'bg-forest' : 'bg-lime'}`}>
                  <Text className={`font-poppins-semibold text-[10px] ${index === 1 ? 'text-lime' : 'text-forest'}`}>{name.charAt(0)}</Text>
                </View>
              ))}
            </View>
            <Text className="font-poppins-semibold text-[12px] text-charcoal">{event.attendees.length} {event.status === 'past' ? 'went' : 'going'}</Text>
          </View>
        )}
        {onToggleSave && (
          <TouchableOpacity accessibilityRole="button" accessibilityLabel={`${saved ? 'Unsave' : 'Save'} ${event.title}`} accessibilityState={{ selected: saved }} onPress={onToggleSave} activeOpacity={0.7} className="h-11 w-11 items-center justify-center">
            <SymbolView name={{ ios: saved ? 'heart.fill' : 'heart', android: 'favorite', web: 'favorite' }} size={24} tintColor={saved ? colors.forest : colors.charcoal} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
