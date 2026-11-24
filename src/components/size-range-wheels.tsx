import { Host, Picker, Row } from '@expo/ui';
import { Text, View } from 'react-native';

import { formatSize, MAX_GROUP_SIZE, MIN_GROUP_SIZE } from '@/types/plan';

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, index) => from + index);

type Props = { size: number; min: number; max: number; onChangeMin: (value: number) => void; onChangeMax: (value: number) => void };

// Two scroll wheels: the smallest group on the left (2 up to your number), the largest on the right (your number up to 10+).
export function SizeRangeWheels({ size, min, max, onChangeMin, onChangeMax }: Props) {
  return (
    <View className="rounded-3xl bg-surface px-4 pb-2 pt-4">
      <View className="flex-row">
        <Text className="flex-1 text-center font-poppins-semibold text-[14px] text-forest">Minimum</Text>
        <Text className="flex-1 text-center font-poppins-semibold text-[14px] text-forest">Maximum</Text>
      </View>
      <Host colorScheme="light" style={{ height: 150 }}>
        <Row>
          <Picker appearance="wheel" accessibilityLabel="Minimum group size" selectedValue={min} onValueChange={onChangeMin}>
            {range(MIN_GROUP_SIZE, size).map(value => <Picker.Item key={value} label={formatSize(value)} value={value} />)}
          </Picker>
          <Picker appearance="wheel" accessibilityLabel="Maximum group size" selectedValue={max} onValueChange={onChangeMax}>
            {range(size, MAX_GROUP_SIZE).map(value => <Picker.Item key={value} label={formatSize(value)} value={value} />)}
          </Picker>
        </Row>
      </Host>
    </View>
  );
}
