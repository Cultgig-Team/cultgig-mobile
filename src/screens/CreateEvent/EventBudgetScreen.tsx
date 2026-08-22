import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, X } from "lucide-react-native";
import { Button, Input, SegmentedProgress } from "../../components";
import { Text } from "../../components/atoms/Text";
import { theme } from "../../theme";

interface EventBudgetScreenProps {
  onBack: () => void;
  onContinue: (budget: string) => void;
}

export const EventBudgetScreen: React.FC<EventBudgetScreenProps> = ({
  onBack,
  onContinue,
}) => {
  const [budget, setBudget] = useState("");

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.progressHeader}>
          <ChevronLeft size={32} strokeWidth={1.5} onPress={onBack} />
          <SegmentedProgress currentStep={4} totalSteps={5} />
          <X />
        </View>

        <View style={styles.formContent}>
          <Text variant="h1">Please enter your budget for your event</Text>
          <Text color="textSecondary">Select a date for your event.</Text>
          <View style={{ alignItems: "center" }}>
            <Input
              placeholder="₹0"
              value={budget}
              onChangeText={setBudget}
              keyboardType="numeric"
              style={styles.budgetInput}
            />
          </View>
        </View>

        <View style={styles.bottomAction}>
          <Button
            label="Continue"
            fullWidth
            disabled={!budget.trim()}
            onPress={() => onContinue(budget.trim())}
            style={styles.continueButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formContent: {
    gap: 12,
    marginTop: 20,
  },
  budgetInput: {
    width: 229,
    height: 98,
    textAlign: "center",
    fontSize: 26,
  },
  bottomAction: {
    marginTop: "auto",
    paddingTop: 24,
  },
  continueButton: {
    height: 52,
  },
});
