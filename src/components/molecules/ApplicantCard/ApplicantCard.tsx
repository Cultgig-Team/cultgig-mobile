import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { IndianRupee } from "lucide-react-native";
import { Text } from "../../atoms/Text";
import { Button } from "../../atoms/Button";
import { theme } from "../../../theme";
import { EventApplicant } from "../../../../assets/dummyData/event-applicants";

interface ApplicantCardProps {
  applicant: EventApplicant;
  onDecline?: () => void;
  onView?: () => void;
}

export const ApplicantCard: React.FC<ApplicantCardProps> = ({
  applicant,
  onDecline,
  onView,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: applicant.avatarUrl }} style={styles.avatar} />
        <View style={styles.info}>
          <Text variant="titleMd">{applicant.name}</Text>
          <Text variant="body" style={styles.bio}>
            {applicant.bio}
          </Text>
          <Text>
            <IndianRupee size={16} />
            <Text variant="titleMd">
              {applicant.budget}
              <Text>/hr</Text>
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          label="Decline"
          variant="outline"
          style={styles.declineBtn}
          labelStyle={{ color: "#0D0D0D" }}
          onPress={onDecline}
        />
        <Button
          label="View"
          variant="outline"
          style={styles.viewBtn}
          labelStyle={{ color: theme.colors.primary }}
          onPress={onView}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 16,
    padding: 12,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 100,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  bio: {
    fontStyle: "italic",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 28,
  },
  declineBtn: {
    width: 151,
    height: 36,
    borderColor: "#C4C4C4",
    borderRadius: 8,
  },
  viewBtn: {
    width: 151,
    height: 36,
    borderRadius: 8,
  },
});
