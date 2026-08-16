import { View, StyleSheet } from "react-native";
import { theme } from "../../../theme";

interface SegmentedProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const SegmentedProgress: React.FC<SegmentedProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[styles.segment, index < currentStep && styles.segmentActive]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  segment: {
    width: 28,
    height: 8,
    borderRadius: 100,
    backgroundColor: "#D9D9D9",
  },

  segmentActive: {
    backgroundColor: theme.colors.primary,
  },
});
