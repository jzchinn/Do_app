import { useLocalSearchParams, usePreventRemove, useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DayPickerModal } from '@/components/day-picker-modal';
import { CategorySearch } from '@/components/category-search';
import { PlaceSearch } from '@/components/place-search';
import { SizeRangeWheels } from '@/components/size-range-wheels';
import { TimePickerModal } from '@/components/time-picker-modal';
import { usePlans } from '@/store/plans';
import { colors } from '@/theme/colors';
import { autoTitle, emptyPlanForm, formatDate, formatSize, formatTime, MAX_GROUP_SIZE, MIN_GROUP_SIZE, type PlanForm } from '@/types/plan';

type Picker = 'day' | 'time' | null;

export function CreatePlanScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  // Opened from the drafts list with a draftId, or blank for a brand-new plan.
  const { draftId } = useLocalSearchParams<{ draftId?: string }>();
  const { drafts, saveDraft, deleteDraft, postPlan } = usePlans();
  const [form, setForm] = useState<PlanForm>(() => drafts.find(draft => draft.id === draftId)?.form ?? emptyPlanForm);
  const [picker, setPicker] = useState<Picker>(null);
  const [submitted, setSubmitted] = useState(false);

  // Swiping the sheet away would fight the size drag, so it is blocked while the size bubble is open.
  // Our own buttons call leave() first, which lifts the block.
  const disablePrevention = usePreventRemove(form.flexible);
  function leave() {
    disablePrevention();
    router.back();
  }

  // Picking a category or place refreshes the suggested title, unless the person has written their own.
  const update = (changes: Partial<PlanForm>) =>
    setForm(current => {
      const next = { ...current, ...changes };
      if (!next.titleEdited && ('category' in changes || 'place' in changes)) next.title = autoTitle(next.category, next.place);
      return next;
    });
  const ready = form.category !== null && form.title.trim() !== '' && form.date !== null && form.time !== null && form.place !== null;

  // The smallest/largest sizes always stay on the right side of the preferred size.
  const minSize = Math.min(form.minSize, form.size);
  const maxSize = Math.max(form.maxSize, form.size);

  // Posting adds the plan to "My events" on Home. Sharing it with friends needs the Supabase backend.
  function handlePost() {
    if (ready && postPlan({ ...form, minSize, maxSize }, draftId)) setSubmitted(true);
  }

  function handleDiscard() {
    if (draftId) deleteDraft(draftId);
    leave();
  }

  function handleSaveDraft() {
    saveDraft({ ...form, minSize, maxSize }, draftId);
    leave();
  }

  // After posting, go straight back to Home, where the plan is listed under My events.
  function handleDone() {
    disablePrevention();
    router.dismissTo('/home');
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView contentInsetAdjustmentBehavior="automatic" automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]} showsVerticalScrollIndicator={false}>
        {submitted ? (
          <View className="rounded-3xl bg-surface p-6">
            <Text className="font-poppins-semibold text-[17px] text-forest">Your plan is posted</Text>
            <Text className="mt-2 font-poppins text-[14px] text-charcoal">&ldquo;{form.title.trim()}&rdquo; · {form.date && formatDate(form.date)} · {form.time && formatTime(form.time)} · {form.place?.name}. It&apos;s listed under My events on Home. Sharing it with friends comes once the backend is connected.</Text>
            <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={handleDone} className="auth-submit mt-5">
              <Text className="auth-submit__label">Done</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="gap-5">
            <CategorySearch category={form.category} onChange={category => update({ category })} />

            <PlaceSearch place={form.place} onChange={place => update({ place })} />

            <View className="flex-row gap-3">
              <TouchableOpacity accessibilityRole="button" accessibilityLabel={`Day, ${form.date ? formatDate(form.date) : 'not set'}`} activeOpacity={0.8} onPress={() => setPicker('day')} className="auth-field flex-1 flex-row items-center">
                <View className="flex-1">
                  <Text className="auth-field__label">Day</Text>
                  <Text numberOfLines={1} className={`font-poppins-medium text-[16px] ${form.date ? 'text-charcoal' : 'text-lime'}`}>{form.date ? formatDate(form.date) : 'Pick a day'}</Text>
                </View>
                <SymbolView name={{ ios: 'calendar', android: 'calendar_today', web: 'calendar_today' }} size={18} tintColor={colors.forest} />
              </TouchableOpacity>
              <TouchableOpacity accessibilityRole="button" accessibilityLabel={`Time, ${form.time ? formatTime(form.time) : 'not set'}`} activeOpacity={0.8} onPress={() => setPicker('time')} className="auth-field flex-1 flex-row items-center">
                <View className="flex-1">
                  <Text className="auth-field__label">Time</Text>
                  <Text numberOfLines={1} className={`font-poppins-medium text-[16px] ${form.time ? 'text-charcoal' : 'text-lime'}`}>{form.time ? formatTime(form.time) : 'Pick a time'}</Text>
                </View>
                <SymbolView name={{ ios: 'clock', android: 'schedule', web: 'schedule' }} size={18} tintColor={colors.forest} />
              </TouchableOpacity>
            </View>

            <View className="auth-field">
              <Text className="auth-field__label">What&apos;s the plan?</Text>
              <TextInput className="auth-field__input" value={form.title} onChangeText={title => update({ title, titleEdited: title !== '' })} placeholder="Drinks at The Roosevelt" placeholderTextColor={colors.lime} maxLength={80} returnKeyType="done" />
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="font-poppins-semibold text-[16px] text-charcoal">How many people?</Text>
              <View className="flex-row items-center">
                <TouchableOpacity accessibilityRole="button" accessibilityLabel="Fewer people" disabled={form.size <= MIN_GROUP_SIZE} activeOpacity={0.8} onPress={() => update({ size: form.size - 1 })} className={`h-12 w-12 items-center justify-center rounded-full bg-forest ${form.size <= MIN_GROUP_SIZE ? 'opacity-30' : ''}`}>
                  <SymbolView name={{ ios: 'minus', android: 'remove', web: 'remove' }} size={18} weight="bold" tintColor={colors.lime} />
                </TouchableOpacity>
                <Text accessibilityLiveRegion="polite" className="w-[60px] text-center font-poppins-bold text-[30px] text-charcoal">{formatSize(form.size)}</Text>
                <TouchableOpacity accessibilityRole="button" accessibilityLabel="More people" disabled={form.size >= MAX_GROUP_SIZE} activeOpacity={0.8} onPress={() => update({ size: form.size + 1 })} className={`h-12 w-12 items-center justify-center rounded-full bg-forest ${form.size >= MAX_GROUP_SIZE ? 'opacity-30' : ''}`}>
                  <SymbolView name={{ ios: 'plus', android: 'add', web: 'add' }} size={18} weight="bold" tintColor={colors.lime} />
                </TouchableOpacity>
              </View>
            </View>

            <Animated.View layout={LinearTransition} className="gap-4">
              <TouchableOpacity accessibilityRole="checkbox" accessibilityState={{ checked: form.flexible }} activeOpacity={0.8} onPress={() => update(form.flexible ? { flexible: false } : { flexible: true, minSize: form.size, maxSize: form.size })} className="min-h-11 flex-row items-center gap-3">
                <View className={`h-6 w-6 items-center justify-center rounded-md border-2 ${form.flexible ? 'border-grass bg-grass' : 'border-lime bg-background'}`}>
                  {form.flexible && <SymbolView name={{ ios: 'checkmark', android: 'check', web: 'check' }} size={12} weight="bold" tintColor={colors.background} />}
                </View>
                <Text className="font-poppins-medium text-[15px] text-charcoal">Flexible on size</Text>
              </TouchableOpacity>

              {form.flexible && (
                <Animated.View entering={FadeIn.duration(250)} exiting={FadeOut.duration(150)}>
                  <SizeRangeWheels size={form.size} min={minSize} max={maxSize} onChangeMin={next => update({ minSize: next })} onChangeMax={next => update({ maxSize: next })} />
                </Animated.View>
              )}
            </Animated.View>

            <View className="gap-3">
              <TouchableOpacity accessibilityRole="button" accessibilityState={{ disabled: !ready }} disabled={!ready} activeOpacity={0.8} onPress={handlePost} className={`auth-submit ${ready ? '' : 'opacity-40'}`}>
                <Text className="auth-submit__label">Post plan</Text>
              </TouchableOpacity>
              <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={handleSaveDraft} className="auth-submit border-forest bg-surface">
                <Text className="auth-submit__label text-forest">Save as draft</Text>
              </TouchableOpacity>
              <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={handleDiscard} className="h-11 items-center justify-center">
                <Text className="font-poppins-medium text-[15px] text-charcoal">Discard plan</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      <DayPickerModal visible={picker === 'day'} value={form.date} onSelect={date => update({ date })} onClose={() => setPicker(null)} />
      <TimePickerModal visible={picker === 'time'} value={form.time} onConfirm={time => update({ time })} onClose={() => setPicker(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 24 },
});
