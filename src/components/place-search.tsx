import { SymbolView } from 'expo-symbols';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { searchPlaces } from '@/lib/places';
import { colors } from '@/theme/colors';
import type { Place } from '@/types/plan';

type Props = { place: Place | null; onChange: (place: Place | null) => void };

// Type to search a real map location. The chosen place keeps its coordinates so it can become a map pin.
export function PlaceSearch({ place, onChange }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Place[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const trimmed = query.trim();
  const searching = place === null && trimmed.length >= 3;

  useEffect(() => {
    if (!searching) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setStatus('loading');
      try {
        setResults(await searchPlaces(trimmed, controller.signal));
        setStatus('idle');
      } catch {
        if (!controller.signal.aborted) setStatus('error');
      }
    }, 400);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searching, trimmed]);

  if (place) {
    return (
      <View className="auth-field flex-row items-center">
        <View className="flex-1">
          <Text className="auth-field__label">Where</Text>
          <Text numberOfLines={1} className="font-poppins-medium text-[16px] text-charcoal">{place.name}</Text>
          {place.address ? <Text numberOfLines={1} className="font-poppins text-[11px] text-forest">{place.address}</Text> : null}
        </View>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Change location" hitSlop={10} onPress={() => onChange(null)} className="h-9 w-9 items-center justify-center rounded-full bg-surface">
          <SymbolView name={{ ios: 'xmark', android: 'close', web: 'close' }} size={12} weight="bold" tintColor={colors.forest} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <View className="auth-field">
        <Text className="auth-field__label">Where</Text>
        <TextInput className="auth-field__input" value={query} onChangeText={setQuery} placeholder="Search for a place" placeholderTextColor={colors.lime} autoCorrect={false} maxLength={80} />
      </View>
      {searching && (
        <View className="mt-2 overflow-hidden rounded-2xl border border-lime bg-background">
          {status === 'loading' && results.length === 0 ? <ActivityIndicator color={colors.forest} className="py-4" /> : null}
          {status === 'error' ? <Text className="p-4 font-poppins text-[13px] text-charcoal">Couldn&apos;t search places. Check your connection and try again.</Text> : null}
          {status === 'idle' && results.length === 0 ? <Text className="p-4 font-poppins text-[13px] text-charcoal">No places found.</Text> : null}
          {results.map(item => (
            <TouchableOpacity key={item.id} accessibilityRole="button" activeOpacity={0.8} onPress={() => { onChange(item); setQuery(''); setResults([]); }} className="border-b border-lime/60 px-4 py-3">
              <Text numberOfLines={1} className="font-poppins-semibold text-[14px] text-charcoal">{item.name}</Text>
              {item.address ? <Text numberOfLines={1} className="font-poppins text-[12px] text-forest">{item.address}</Text> : null}
            </TouchableOpacity>
          ))}
          <Text className="px-4 py-2 font-poppins text-[10px] text-forest">Search by Photon · © OpenStreetMap contributors</Text>
        </View>
      )}
    </View>
  );
}
