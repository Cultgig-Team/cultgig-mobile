import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Text } from "../../components/atoms/Text";
import { Button } from "../../components/atoms/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react-native";
import { usePopularEventDetail } from "../../hooks/useArtworks";
import { SegmentedProgress } from "../../components/molecules/SegmentedProgress/SegmentedProgress";

interface ApplyOnEventProps {
  eventId?: number | undefined;
  onBack?: () => void;
  onContinue?: (budget: number) => void;
}

export const ApplyOnEvent: React.FC<ApplyOnEventProps> = ({
  eventId,
  onBack,
  onContinue,
}) => {
  const [selectedOption, setSelectedOption] = useState<
    "business" | "proposed" | null
  >(null);
  const { data: event } = usePopularEventDetail(eventId ?? 0);

  if (!event) {
    return (
      <View style={styles.centered}>
        <Text variant="body" color="textSecondary">
          Event not found.
        </Text>
      </View>
    );
  }
  const selectedBudget = event.budget;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={{ flexDirection: "row", gap: 81 }}>
          <ChevronLeft size={32} strokeWidth={1.5} onPress={onBack} />
          <SegmentedProgress currentStep={1} totalSteps={4} />
        </View>
        <Text variant="h1" style={styles.heading}>
          How would you like to apply for this gig ?
        </Text>

        <Pressable
          onPress={() => setSelectedOption("business")}
          style={[
            styles.optionCard,
            selectedOption === "business" && styles.optionCardSelected,
          ]}
        >
          <View>
            <Text variant="titleMd">Apply at business budget</Text>
            <Text color="textSecondary">Apply this budget posted by Club</Text>
          </View>
          <Text variant="button" style={styles.budget}>
            ₹{event.budget}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setSelectedOption("proposed")}
          style={[
            styles.optionCard,
            selectedOption === "proposed" && styles.optionCardSelected,
            styles.proposedSection,
          ]}
        >
          <Text variant="titleMd">Proposed your price</Text>
          <Text color="textSecondary">
            Have a different rate in mind? Suggest your price & the owner will
            review it
          </Text>
          <View style={styles.tagline}>
            <Text variant="button" style={{ color: theme.colors.accent }}>
              Set your price next{" "}
            </Text>
            <ChevronRight color={theme.colors.accent} size={18} />
          </View>
        </Pressable>

        <View style={styles.proposedTip}>
          <Lightbulb />
          <View style={styles.tipText}>
            <Text variant="titleMd">Why Proposed?</Text>
            <Text variant="bodySmall">
              You can suggest a fair price that matches your experience and
              effort
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          label="Continue"
          onPress={() => onContinue?.(selectedBudget)}
          fullWidth
          disabled={!selectedOption}
          style={styles.continueButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  optionCard: {
    padding: theme.spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  optionCardSelected: {
    borderColor: theme.colors.primary,
  },
  contentContainer: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  budget: {
    color: theme.colors.accent,
  },
  proposedSection: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing.sm,
  },
  tagline: {
    flexDirection: "row",
    alignItems: "center",
  },
  proposedTip: {
    padding: theme.spacing.md,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    borderWidth: 1,
    borderColor: theme.colors.backgroundSecondary,
    borderRadius: 12,
    backgroundColor: "#FAF2F9",
  },
  tipText: {
    flex: 1,
    flexShrink: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    paddingTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  continueButton: {
    marginTop: theme.spacing.xs,
    height: 52,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
});
