import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronLeft, IndianRupee, MapPin, Star } from "lucide-react-native";
import { Text } from "../../components/atoms/Text";
import { Button } from "../../components/atoms/Button";
import { theme } from "../../theme";
import { RootStackParamList } from "../../navigation/types";
import {
  eventApplicants,
  EventApplicant,
} from "../../../assets/dummyData/event-applicants";

type ApplicantDetailRouteProp = RouteProp<
  RootStackParamList,
  "ApplicantDetail"
>;

export const ApplicantDetailScreen: React.FC = () => {
  const route = useRoute<ApplicantDetailRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { applicantId } = route.params;

  // Look up the applicant from dummy data — replace with real API call later
  const applicant: EventApplicant | undefined = eventApplicants.find(
    (a) => a.id === applicantId
  );

  if (!applicant) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.center}>
          <Text variant="body">Applicant not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ChevronLeft
            size={32}
            strokeWidth={1.5}
            color={theme.colors.textPrimary}
          />
        </TouchableOpacity>
        <Text variant="titleMd" style={styles.headerTitle}>
          Applicant Detail
        </Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Row */}
        <View style={styles.profileRow}>
          <Image source={{ uri: applicant.avatarUrl }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text variant="titleMd">{applicant.name}</Text>
            <Text variant="body" style={styles.bio}>
              {applicant.bio}
            </Text>
          </View>
        </View>

        {/* Budget */}
        <View style={styles.row}>
          <IndianRupee size={18} color={theme.colors.primary} />
          <Text variant="titleMd" style={{ color: theme.colors.primary }}>
            {applicant.budget}
            <Text variant="body" style={{ color: theme.colors.textSecondary }}>
              {" "}
              / hr
            </Text>
          </Text>
        </View>

        {/* Placeholder sections — user will fill in real data later */}
        <View style={styles.section}>
          <Text variant="titleMd" style={styles.sectionTitle}>
            About
          </Text>
          <Text variant="body" color="textSecondary">
            {applicant.bio}
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titleMd" style={styles.sectionTitle}>
            Skills
          </Text>
          <Text variant="body" color="textSecondary">
            — to be filled —
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titleMd" style={styles.sectionTitle}>
            Portfolio
          </Text>
          <Text variant="body" color="textSecondary">
            — to be filled —
          </Text>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <Button
          label="Decline"
          variant="outline"
          style={styles.declineBtn}
          labelStyle={{ color: "#0D0D0D" }}
          onPress={() => navigation.goBack()}
        />
        <Button
          label="Accept"
          variant="primary"
          style={styles.acceptBtn}
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

export default ApplicantDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitle: {
    fontWeight: "700",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 20,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  profileInfo: {
    flex: 1,
    gap: 6,
  },
  bio: {
    fontStyle: "italic",
    color: theme.colors.textSecondary,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  declineBtn: {
    width: 151,
    height: 44,
    borderColor: "#C4C4C4",
    borderRadius: 8,
  },
  acceptBtn: {
    width: 151,
    height: 44,
    borderRadius: 8,
  },
});
