import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronLeft } from "lucide-react-native";
import { Text } from "../../components/atoms/Text";
import { theme } from "../../theme";
import { RootStackParamList } from "../../navigation/types";

type EventApplicantsRouteProp = RouteProp<
  RootStackParamList,
  "EventApplicants"
>;

interface EventApplicantsScreenProps {
  eventId?: number;
  onBack?: () => void;
}

export const EventApplicantsScreen: React.FC<EventApplicantsScreenProps> = ({
  eventId: eventIdProp,
  onBack: onBackProp,
}) => {
  const route = useRoute<EventApplicantsRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const eventId = eventIdProp ?? route.params?.eventId;

  const handleBack = () => {
    if (onBackProp) {
      onBackProp();
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ChevronLeft
            size={32}
            strokeWidth={1.5}
            color={theme.colors.textPrimary}
          />
        </TouchableOpacity>
        <Text variant="titleMd" style={styles.headerTitle}>
          Event Applicants
        </Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Placeholder Content */}
      <View style={styles.centered}>
        <Text variant="h2" style={styles.title}>
          Event Applicants
        </Text>
        <Text variant="body" color="textSecondary" style={styles.subtitle}>
          Applicants for Event ID: {eventId}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default EventApplicantsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
  },
});
