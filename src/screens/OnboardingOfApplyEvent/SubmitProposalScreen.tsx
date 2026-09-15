import React from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, X } from "lucide-react-native";
import { Button, SegmentedProgress, Text } from "../../components";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface SubmitProposalScreenProps {
  budget: number;
  proposedPrice: number;
  proposalDescription: string;
  onBack?: () => void;
  onContinue?: () => void;
}

export const SubmitProposalScreen: React.FC<SubmitProposalScreenProps> = ({
  budget,
  proposedPrice,
  proposalDescription,
  onBack,
  onContinue,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{ flexDirection: "row", gap: 81 }}>
          <ChevronLeft size={32} strokeWidth={1.5} onPress={onBack} />
          <SegmentedProgress currentStep={4} totalSteps={4} />
          <Pressable onPress={() => navigation.navigate("MainTabs")}>
            <X />
          </Pressable>
        </View>

        <Text variant="h1" style={styles.title}>
          Hey, finally review your application
        </Text>
        <Text variant="titleMd" color="textSecondary" style={styles.proposal}>
          {proposedPrice === budget
            ? "APPLICATION PRICE"
            : "YOUR COUNTER OFFER"}
        </Text>
        <View style={styles.card1}>
          <View style={styles.carditem}>
            <Text variant="bodySmallBold">Business Budget</Text>
            <Text variant="bodySmallBold" style={styles.singlePriceText}>
              ₹{budget}
            </Text>
          </View>

          <View style={styles.carditem}>
            <View>
              <Text variant="bodySmallBold">Your proposed price</Text>
              {proposedPrice === budget && (
                <Text variant="bodySmallBold" style={styles.badge}>
                  At business budget
                </Text>
              )}
            </View>
            <Text variant="bodySmallBold">₹{proposedPrice}</Text>
          </View>

          {proposedPrice !== budget && (
            <View style={styles.difference}>
              <View>
                <Text variant="bodySmallBold">Difference</Text>
                <Text variant="bodySmallBold" style={styles.badge1}>
                  Awaiting business review
                </Text>
              </View>

              <Text
                variant="bodySmallBold"
                style={{ color: theme.colors.primary }}
              >
                +₹{proposedPrice - budget}
              </Text>
            </View>
          )}
        </View>
        {proposedPrice !== budget && (
          <View
            style={{
              backgroundColor: "#FBF3E7",
              marginTop: 8,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 12,
            }}
          >
            <Text variant="bodySmallBold" style={{ color: "#7C5C2A" }}>
              The business hasn't accepted this price yet — they'll review it
              along with your application.
            </Text>
          </View>
        )}
        <Text variant="titleMd" color="textSecondary" style={styles.proposal}>
          Your proposal message
        </Text>
        <View style={styles.card}>
          <Text variant="body" style={styles.description}>
            "{proposalDescription}"
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {onContinue && (
          <Button
            label="Submit Application"
            onPress={onContinue}
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
  badge: {
    backgroundColor: "#1584421A",
    color: "#158442",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 100,
    marginTop: 8,
  },
  badge1: {
    backgroundColor: "#FBF3E7",
    color: "#7C5C2A",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 100,
    marginTop: 8,
  },
  contentContainer: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  title: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  card1: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.lg,
    backgroundColor: "#FCF7FB",
  },
  card: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    backgroundColor: "#FCF7FB",
  },
  singlePriceText: {},
  difference: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    borderBottomEndRadius: 12,
    borderBottomLeftRadius: 12,
  },
  carditem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing.md,
  },
  description: {
    marginTop: theme.spacing.sm,
    lineHeight: 22,
    fontStyle: "italic",
  },
  proposal: {
    marginTop: theme.spacing.md,
    marginBottom: 12,
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
