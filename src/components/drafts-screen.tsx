import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { usePlans } from '@/store/plans';
import { colors } from '@/theme/colors';
import { formatDate, formatTime, type PlanDraft } from '@/types/plan';

function draftDetails({ form }: PlanDraft) {
  const parts = [form.date && formatDate(form.date), form.time && formatTime(form.time), form.place?.name].filter(Boolean);
  return parts.length > 0 ? parts.join(' · ') : 'Nothing filled in yet';
}

// Where "Make a plan" starts: begin a new plan, or pick up a saved draft.
export function DraftsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { drafts, deleteDraft } = usePlans();

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]} showsVerticalScrollIndicator={false}>
        <TouchableOpacity accessibilityRole="button" activeOpacity={0.85} onPress={() => router.push('/create-plan')} className="auth-submit mb-8 flex-row gap-2">
          <SymbolView name={{ ios: 'plus', android: 'add', web: 'add' }} size={16} weight="heavy" tintColor={colors.lime} />
          <Text className="auth-submit__label">Make a new plan</Text>
        </TouchableOpacity>

        <Text accessibilityRole="header" className="mb-3 font-poppins-bold text-[22px] text-charcoal">Drafts</Text>
        {drafts.length === 0 ? (
          <View className="rounded-3xl bg-surface p-6">
            <Text className="font-poppins-semibold text-[17px] text-forest">No drafts yet</Text>
            <Text className="mt-2 font-poppins text-[14px] text-charcoal">Plans you save as a draft wait here until you are ready to post them.</Text>
          </View>
        ) : (
          drafts.map(draft => (
            <View key={draft.id} className="mb-3 flex-row items-center rounded-3xl bg-surface pl-5">
              <TouchableOpacity accessibilityRole="button" accessibilityLabel={`Continue draft: ${draft.form.title || 'Untitled plan'}`} activeOpacity={0.8} onPress={() => router.push({ pathname: '/create-plan', params: { draftId: draft.id } })} className="min-w-0 flex-1 py-4">
                <Text numberOfLines={1} className="font-poppins-semibold text-[15px] text-charcoal">{draft.form.title || draft.form.category || 'Untitled plan'}</Text>
                <Text numberOfLines={1} className="mt-0.5 font-poppins text-[12px] text-charcoal/70">{draftDetails(draft)}</Text>
              </TouchableOpacity>
              <TouchableOpacity accessibilityRole="button" accessibilityLabel="Delete draft" activeOpacity={0.7} onPress={() => deleteDraft(draft.id)} className="h-14 w-14 items-center justify-center">
                <SymbolView name={{ ios: 'trash', android: 'delete', web: 'delete' }} size={18} tintColor={colors.forest} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 24 },
});
