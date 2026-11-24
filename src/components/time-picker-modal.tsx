import { Host, Picker, Row } from '@expo/ui';
import { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity } from 'react-native';

import type { PlanTime } from '@/types/plan';

const hours = Array.from({ length: 12 }, (_, index) => index + 1);
const minutes = [0, 15, 30, 45];
const periods = ['AM', 'PM'] as const;

type Props = { visible: boolean; value: PlanTime | null; onConfirm: (time: PlanTime) => void; onClose: () => void };

// Alarm-style wheels: hour, minute (15-minute steps), AM/PM.
export function TimePickerModal({ visible, value, onConfirm, onClose }: Props) {
  const [hour, setHour] = useState(value ? value.hour % 12 || 12 : 7);
  const [minute, setMinute] = useState(value?.minute ?? 0);
  const [period, setPeriod] = useState<(typeof periods)[number]>(value ? (value.hour < 12 ? 'AM' : 'PM') : 'PM');

  function handleConfirm() {
    onConfirm({ hour: (hour % 12) + (period === 'PM' ? 12 : 0), minute });
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable accessibilityLabel="Close time picker" onPress={onClose} className="flex-1 items-center justify-center bg-charcoal/40 px-5">
        <Pressable className="w-full rounded-3xl bg-background p-5">
          <Text accessibilityRole="header" className="mb-2 text-center font-poppins-semibold text-[17px] text-charcoal">What time?</Text>
          <Host colorScheme="light" style={{ height: 180 }}>
            <Row>
              <Picker appearance="wheel" accessibilityLabel="Hour" selectedValue={hour} onValueChange={setHour}>
                {hours.map(item => <Picker.Item key={item} label={String(item)} value={item} />)}
              </Picker>
              <Picker appearance="wheel" accessibilityLabel="Minute" selectedValue={minute} onValueChange={setMinute}>
                {minutes.map(item => <Picker.Item key={item} label={String(item).padStart(2, '0')} value={item} />)}
              </Picker>
              <Picker appearance="wheel" accessibilityLabel="AM or PM" selectedValue={period} onValueChange={next => setPeriod(next as (typeof periods)[number])}>
                {periods.map(item => <Picker.Item key={item} label={item} value={item} />)}
              </Picker>
            </Row>
          </Host>
          <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={handleConfirm} className="auth-submit mt-3">
            <Text className="auth-submit__label">Set time</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
