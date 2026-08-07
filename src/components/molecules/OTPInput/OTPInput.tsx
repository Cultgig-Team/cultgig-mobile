import React, { useRef } from 'react';
import { View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { theme } from '../../../theme';

export interface OTPInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
}

/**
 * MOLECULE: OTPInput
 * -------------------------------------------------------
 * Row of single-digit boxes (Figma node "Artist 124") with
 * auto-advance to the next box on entry and auto-back on
 * backspace when a box is empty.
 */
export const OTPInput: React.FC<OTPInputProps> = ({ length = 5, value, onChange }) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChangeText = (text: string, index: number) => {
    const digit = text.slice(-1);
    const next = [...value];
    next[index] = digit;
    onChange(next);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.row}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          style={styles.box}
          maxLength={1}
          keyboardType="number-pad"
          value={value[index] ?? ''}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 55,
    height: 68,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
    textAlign: 'center',
    fontSize: theme.fontSize.xl,
    color: theme.colors.textPrimary,
  },
});
