import React, { useMemo, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { Button, Input, SegmentedProgress, Text } from "@/components";
import { theme } from "../../theme";

interface NegotiatePriceScreenProps {
  budget: number;
  onBack?: () => void;
  onContinue?: (proposedPrice: number) => void;
}

export const NegotiatePriceScreen: React.FC<NegotiatePriceScreenProps> = ({
  budget,
  onBack,
  onContinue,
}) => {
  const [proposedPrice, setProposedPrice] = useState("");

  const isValidPrice = useMemo(() => {
    const numericValue = Number(proposedPrice);
    return (
      proposedPrice.trim().length > 0 &&
      !Number.isNaN(numericValue) &&
      numericValue > budget
    );
  }, [budget, proposedPrice]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{ flexDirection: "row", gap: 81 }}>
          <ChevronLeft size={32} strokeWidth={1.5} onPress={onBack} />
          <SegmentedProgress currentStep={2} totalSteps={4} />
        </View>

        <Text variant="h1" style={styles.title}>
          How would you like to negotiate ?
        </Text>

        <View style={styles.section}>
          <Text variant="titleMd">Original Price</Text>
          <Text variant="titleLg" style={styles.card}>
            ₹{budget}
          </Text>
          <Text variant="bodySmall" color="textSecondary">
            This price set by the business owner
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titleMd">Your Proposed Price</Text>
          <Input
            style={{
              paddingHorizontal: 16,
              paddingVertical: 15,
            }}
            placeholder="Enter your price"
            keyboardType="numeric"
            value={proposedPrice}
            onChangeText={setProposedPrice}
          />
          <Text variant="bodySmall" color="textSecondary">
            Suggested price must be more than ₹{budget}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {isValidPrice && onContinue && (
          <Button
            label="Continue"
            onPress={() => onContinue(Number(proposedPrice))}
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
  card: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.lg,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 16,
  },
  section: {
    gap: 12,
    marginBottom: theme.spacing.md,
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
