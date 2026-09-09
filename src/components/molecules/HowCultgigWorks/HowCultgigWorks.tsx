import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  MessageSquare,
  NotepadText,
} from "lucide-react-native";
import { Text } from "../../atoms/Text";
import { theme } from "../../../theme";

const STEPS = [
  {
    icon: ArrowRight,
    title: "Post what you need",
    description: "Event date, budget and a short brief",
  },
  {
    icon: MessageSquare,
    title: "Compare & message",
    description: "Artists apply or you request directly",
  },
  {
    icon: BadgeCheck,
    title: "Every artist is phone-verified",
    description: "Reviews come only from real",
  },
  {
    icon: Check,
    title: "Book with confidence",
    description: "Event date, budget and a short brief",
  },
];

export const HowCultgigWorks = () => (
  <View>
    <Text variant="h2" style={{ paddingTop: 20, paddingBottom: 12 }}>
      How Cultgig works
    </Text>
    <View style={styles.card}>
      {STEPS.map(({ icon: Icon, title, description }) => (
        <View key={title} style={styles.step}>
          <View style={styles.iconWrapper}>
            <Icon color={theme.colors.primary} />
          </View>
          <View style={styles.stepContent}>
            <Text variant="titleMd">{title}</Text>
            <Text color="textSecondary">{description}</Text>
          </View>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FCF7FB",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 16,
  },
  step: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    marginHorizontal: 16,
    paddingVertical: 20,
  },
  iconWrapper: {
    padding: 12,
    backgroundColor: "#E8BFDF80",
    borderRadius: 12,
  },
  stepContent: {
    flex: 1,
  },
});
