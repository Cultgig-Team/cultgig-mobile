import React, { useEffect, useRef } from 'react';
import { View, PanResponder, PanResponderInstance, StyleSheet, LayoutChangeEvent } from 'react-native';
import { theme } from '../../../theme';

export interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  valueMin: number;
  valueMax: number;
  onChange: (min: number, max: number) => void;
}

/**
 * ATOM: RangeSlider
 * -------------------------------------------------------
 * Dual-thumb range slider for the hourly-budget screen
 * (Artist 116, "₹1,000 - ₹10,000 per hour service"). No
 * slider library is in package.json, so this is a small
 * PanResponder-based implementation — swap for a dedicated
 * range-slider package later if you want native platform
 * styling/haptics.
 */
export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 100,
  valueMin,
  valueMax,
  onChange,
}) => {
  const trackWidth = useRef(0);
  const valuesRef = useRef({ valueMin, valueMax });
  useEffect(() => {
    valuesRef.current = { valueMin, valueMax };
  }, [valueMin, valueMax]);

  const clampX = (x: number) => Math.max(0, Math.min(trackWidth.current, x));
  const toStep = (v: number) => Math.round(v / step) * step;
  const xToValue = (x: number) => {
    if (trackWidth.current === 0) return min;
    const ratio = clampX(x) / trackWidth.current;
    return toStep(min + ratio * (max - min));
  };
  const valueToX = (v: number) => ((v - min) / (max - min)) * trackWidth.current;

  const createResponder = (thumb: 'min' | 'max'): PanResponderInstance => {
    let startX = 0;
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        const { valueMin: vMin, valueMax: vMax } = valuesRef.current;
        startX = valueToX(thumb === 'min' ? vMin : vMax);
      },
      onPanResponderMove: (_evt, gesture) => {
        const { valueMin: vMin, valueMax: vMax } = valuesRef.current;
        const next = xToValue(startX + gesture.dx);
        if (thumb === 'min') {
          onChange(Math.min(next, vMax - step), vMax);
        } else {
          onChange(vMin, Math.max(next, vMin + step));
        }
      },
    });
  };

  const minResponder = useRef(createResponder('min')).current;
  const maxResponder = useRef(createResponder('max')).current;

  const minPct = ((valueMin - min) / (max - min)) * 100;
  const maxPct = ((valueMax - min) / (max - min)) * 100;

  return (
    <View
      style={styles.track}
      onLayout={(e: LayoutChangeEvent) => {
        trackWidth.current = e.nativeEvent.layout.width;
      }}
    >
      <View style={[styles.fill, { left: `${minPct}%`, right: `${100 - maxPct}%` }]} />
      <View style={[styles.thumb, { left: `${minPct}%` }]} {...minResponder.panHandlers} />
      <View style={[styles.thumb, { left: `${maxPct}%` }]} {...maxResponder.panHandlers} />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 4,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xl,
    justifyContent: 'center',
  },
  fill: {
    position: 'absolute',
    height: 4,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.primary,
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.primary,
    marginLeft: -10,
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
});
