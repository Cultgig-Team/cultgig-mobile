import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Banknote,
  ChevronLeft,
  Cross,
  CrossIcon,
  MessageCircle,
  X,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
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
    (a) => a.id === applicantId,
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
          <X size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Card with gradient */}
        <View style={styles.card}>
          <LinearGradient
            colors={["#FAF2F9", "#FFFFFF"]}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />

          {/* Avatar centered */}
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: applicant.avatarUrl }}
              style={styles.avatar}
            />
          </View>

          <Text variant="titleMd" style={styles.name}>
            {applicant.name}
          </Text>

          {/* Proposal Price */}
          <View style={styles.infoRow}>
            <View style={styles.iconBubble}>
              <Banknote size={20} color={theme.colors.primary} />
            </View>
            <View>
              <Text variant="body" color="textSecondary">
                Proposal Price
              </Text>
              <Text variant="titleMd">
                ₹{applicant.budget}
                <Text variant="body" color="textSecondary">
                  /hr
                </Text>
              </Text>
            </View>
          </View>

          {/* Proposal Message */}
          <View style={styles.infoRow}>
            <View style={styles.iconBubble}>
              <MessageCircle size={20} color={theme.colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="body" color="textSecondary">
                Proposal Message
              </Text>
              <Text variant="body" style={styles.bio}>
                "{applicant.bio}"
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer — vertical stack */}
      <View style={styles.footer}>
        <Button
          label="Start Chat"
          variant="primary"
          fullWidth
          onPress={() => console.log("Start chat", applicant.id)}
        />
        <Button
          label="Go Back"
          variant="outline"
          fullWidth
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
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  card: {
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 24,
    paddingHorizontal: 20,
    gap: 20,
  },
  avatarWrapper: {
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  name: {
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  iconBubble: {
    backgroundColor: "#E8BFDF33",
    padding: 14,
    borderRadius: 100,
  },
  bio: {
    fontStyle: "italic",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
});
