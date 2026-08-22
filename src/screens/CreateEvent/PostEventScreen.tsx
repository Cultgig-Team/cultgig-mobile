import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  IndianRupeeIcon,
  MapPin,
  NotepadText,
  StickyNote,
  TicketsPlaneIcon,
  X,
} from "lucide-react-native";
import { Button, SegmentedProgress } from "../../components";
import { Text } from "../../components/atoms/Text";
import { theme } from "../../theme";

interface PostEventScreenProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  addressDetails: string;
  budget: string;
  onBack: () => void;
  onContinue: () => void;
}

export const PostEventScreen: React.FC<PostEventScreenProps> = ({
  title,
  description,
  date,
  time,
  location,
  addressDetails,
  budget,
  onBack,
  onContinue,
}) => (
  <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.progressHeader}>
        <ChevronLeft size={32} strokeWidth={1.5} onPress={onBack} />
        <SegmentedProgress currentStep={5} totalSteps={5} />
        <X />
      </View>
      <Text variant="h1" style={styles.heading}>
        Alright, ready to get offers from top artists
      </Text>
      <Text variant="body" color="textSecondary">
        Post the task when you’re ready
      </Text>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryContent}>
            <NotepadText size={20} color={theme.colors.textPrimary} />
            <Text>{title}</Text>
          </View>
          <ChevronRight />
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryContent}>
            <StickyNote size={20} color={theme.colors.textPrimary} />
            <Text>{description}</Text>
          </View>
          <ChevronRight />
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryContent}>
            <CalendarDays size={20} color={theme.colors.textPrimary} />
            <Text>{date}</Text>
          </View>
          <ChevronRight />
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryContent}>
            <Clock3 size={20} color={theme.colors.textPrimary} />
            <Text>{time}</Text>
          </View>
          <ChevronRight />
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryContent}>
            <MapPin size={20} color={theme.colors.textPrimary} />
            <Text>{location || "Not provided"}</Text>
          </View>
          <ChevronRight />
        </View>
        {addressDetails ? (
          <View style={styles.summaryRow}>
            <View style={styles.summaryContent}>
              <MapPin size={20} color={theme.colors.textPrimary} />
              <Text>{addressDetails}</Text>
            </View>
            <ChevronRight />
          </View>
        ) : null}
        <View style={styles.summaryRow}>
          <View style={styles.summaryContent}>
            <IndianRupeeIcon size={20} color={theme.colors.textPrimary} />
            <Text>₹{budget}</Text>
          </View>
          <ChevronRight />
        </View>
      </View>
      <View style={styles.bottomAction}>
        <Button
          label="Post Event"
          fullWidth
          onPress={onContinue}
          style={styles.button}
        />
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { flexGrow: 1, paddingHorizontal: 20, paddingBottom: 24 },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  heading: { marginTop: 28 },
  summary: { marginTop: 16, gap: 12 },
  summaryRow: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 22,
  },
  summaryContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  label: { color: theme.colors.textPrimary },
  bottomAction: { marginTop: "auto", paddingTop: 24 },
  button: { height: 52 },
});
