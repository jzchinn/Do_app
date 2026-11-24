import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { activityCategories } from '@/data/activities';
import { colors } from '@/theme/colors';

const MAX_SUGGESTIONS = 8;

type Props = { category: string | null; onChange: (category: string | null) => void };

// Search the common categories, or type your own.
export function CategorySearch({ category, onChange }: Props) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  if (category) {
    return (
      <View className="auth-field flex-row items-center">
        <View className="flex-1">
          <Text className="auth-field__label">What are we doing?</Text>
          <Text numberOfLines={1} className="font-poppins-medium text-[16px] text-charcoal">{category}</Text>
        </View>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Change category" hitSlop={10} onPress={() => onChange(null)} className="h-9 w-9 items-center justify-center rounded-full bg-surface">
          <SymbolView name={{ ios: 'xmark', android: 'close', web: 'close' }} size={12} weight="bold" tintColor={colors.forest} />
        </TouchableOpacity>
      </View>
    );
  }

  const trimmed = query.trim();
  const matches = activityCategories.filter(item => item.toLowerCase().includes(trimmed.toLowerCase())).slice(0, MAX_SUGGESTIONS);
  const hasExactMatch = activityCategories.some(item => item.toLowerCase() === trimmed.toLowerCase());
  const choose = (value: string) => {
    onChange(value);
    setQuery('');
  };

  return (
    <View>
      <View className="auth-field">
        <Text className="auth-field__label">What are we doing?</Text>
        <TextInput className="auth-field__input" value={query} onChangeText={setQuery} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder="Drinks, dinner, movie…" placeholderTextColor={colors.lime} autoCorrect={false} maxLength={30} />
      </View>
      {(focused || trimmed !== '') && (
        <View className="mt-2 flex-row flex-wrap gap-2">
          {matches.map(item => (
            <TouchableOpacity key={item} accessibilityRole="button" activeOpacity={0.8} onPress={() => choose(item)} className="min-h-10 items-center justify-center rounded-full bg-surface px-4">
              <Text className="font-poppins-semibold text-[14px] text-forest">{item}</Text>
            </TouchableOpacity>
          ))}
          {trimmed !== '' && !hasExactMatch && (
            <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={() => choose(trimmed)} className="min-h-10 items-center justify-center rounded-full bg-forest px-4">
              <Text className="font-poppins-semibold text-[14px] text-lime">Use &ldquo;{trimmed}&rdquo;</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}
