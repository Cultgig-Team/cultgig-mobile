import React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronLeft, X } from "lucide-react-native";
import { Text } from "../../components/atoms/Text";
import { theme } from "../../theme";
import { RootStackParamList } from "../../navigation/types";
import { ApplicantCard } from "../../components/molecules/ApplicantCard";
import {
  eventApplicants,
  EventApplicant,
} from "../../../assets/dummyData/event-applicants";

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

  const renderItem = ({ item }: { item: EventApplicant }) => (
    <ApplicantCard
      applicant={item}
      onDecline={() => console.log("Decline", item.id)}
      onView={() =>
        navigation.navigate("ApplicantDetail", { applicantId: item.id })
      }
    />
  );

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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <X size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={eventApplicants}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
  },
  headerTitle: {
    fontWeight: "700",
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  separator: {
    height: 16,
  },
});
