import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Lightbulb } from "lucide-react-native";
import { Button, SegmentedProgress, Text } from "@/components";
import { theme } from "../../theme";

interface ProposalScreenProps {
  budget: number;
  proposedPrice: number;
  onBack?: () => void;
  onContinue?: (proposalDescription: string) => void;
}

export const ProposalScreen: React.FC<ProposalScreenProps> = ({
  budget,
  proposedPrice,
  onBack,
  onContinue,
}) => {
  const [proposalDescription, setProposalDescription] = useState("");
  const isValidProposal = proposalDescription.trim().length > 0;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{ flexDirection: "row", gap: 81 }}>
          <ChevronLeft size={32} strokeWidth={1.5} onPress={onBack} />
          <SegmentedProgress currentStep={3} totalSteps={4} />
        </View>

        <Text variant="h1" style={styles.title}>
          Write your final gig proposal ?
        </Text>

        <TextInput
          multiline
          numberOfLines={7}
          placeholder="Enter your proposal"
          value={proposalDescription}
          onChangeText={setProposalDescription}
          style={styles.textArea}
          textAlignVertical="top"
        />

        <View style={styles.proposedTip}>
          <Lightbulb color={theme.colors.primary} />
          <View style={styles.tipTextWrapper}>
            <Text style={styles.tipText}>
              <Text style={styles.tipLabel}>Tip:</Text> Add your experience or
              value you bring to increase acceptance chances
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {isValidProposal && onContinue && (
          <Button
            label="Continue"
            onPress={() => onContinue(proposalDescription.trim())}
            fullWidth
            style={styles.continueButton}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  title: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  textArea: {
    minHeight: 193,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.lg,
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: theme.colors.background,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  proposedTip: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    borderColor: theme.colors.backgroundSecondary,
    borderRadius: 12,
    backgroundColor: "#FAF2F9",
  },
  tipTextWrapper: {
    flex: 1,
    flexShrink: 1,
  },
  tipText: {
    color: theme.colors.primary,
    lineHeight: 20,
    flexShrink: 1,
  },
  tipLabel: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  continueButton: {
    height: 52,
  },
});
