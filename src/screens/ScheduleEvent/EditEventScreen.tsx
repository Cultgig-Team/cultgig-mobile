import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  CalendarDays,
  ChevronLeft,
  Clock3,
  MapPin,
  Banknote,
  StickyNote,
} from "lucide-react-native";
import { Text } from "../../components/atoms/Text";
import { Input } from "../../components/atoms/Input";
import { Button } from "../../components/atoms/Button";
import { theme } from "../../theme";
import { RootStackParamList } from "../../navigation/types";
import DateTimePicker, {
  DateTimePickerChangeEvent,
} from "@react-native-community/datetimepicker";
import { useMyEventDetail } from "../../hooks/useArtworks";

type EditEventRouteProp = RouteProp<RootStackParamList, "EditEvent">;

interface EditEventScreenProps {
  eventId?: number;
  onBack?: () => void;
  onSave?: (event: {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    budget: string;
  }) => void;
}

export const EditEventScreen: React.FC<EditEventScreenProps> = ({
  eventId: eventIdProp,
  onBack: onBackProp,
  onSave,
}) => {
  const route = useRoute<EditEventRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const eventId = eventIdProp ?? route.params?.eventId;

  const { data: event, isLoading, error } = useMyEventDetail(eventId ?? 0);

  const handleBack = () => {
    if (onBackProp) {
      onBackProp();
    } else {
      navigation.goBack();
    }
  };

  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [pickerMode, setPickerMode] = useState<"date" | "time" | null>(null);
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    if (event) {
      setEventTitle(event.title);
      setDescription(event.eventDescription);
      setLocation(event.location);
      setBudget(String(event.budget));

      if (event.thingsToKnow?.date) {
        setDate(new Date(event.thingsToKnow.date));
      }
      if (event.thingsToKnow?.time) {
        const [hours, minutes] = event.thingsToKnow.time.split(":").map(Number);
        const timeDate = new Date();
        timeDate.setHours(hours, minutes, 0, 0);
        setTime(timeDate);
      }
    }
  }, [event]);

  const handlePickerValueChange = (
    _event: DateTimePickerChangeEvent,
    value: Date,
  ) => {
    if (pickerMode === "date") {
      setDate(value);
    } else if (pickerMode === "time") {
      setTime(value);
    }

    setPickerMode(null);
  };

  const handlePickerDismiss = () => {
    setPickerMode(null);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        title: eventTitle,
        description,
        date: date?.toLocaleDateString() ?? "",
        time:
          time?.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }) ?? "",
        location,
        budget: budget || "0",
      });
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.center}>
          <Text variant="body" color="textSecondary">
            Loading event...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !event) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.center}>
          <Text variant="body" color="textSecondary">
            Event not found.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <ChevronLeft
            size={32}
            strokeWidth={1.5}
            color={theme.colors.textPrimary}
          />
        </TouchableOpacity>
        <Text variant="titleLg">Edit Event</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.formSection}>
          <Text variant="titleLg" style={styles.titleLabel}>
            Title of the Event
          </Text>
          <Text color="textSecondary">
            In few words what do you need to done ?
          </Text>
          <View style={styles.titleInputWrapper}>
            <Input
              value={eventTitle}
              onChangeText={setEventTitle}
              style={styles.titleInputInner}
              placeholder="Event Title"
            />
          </View>
          <Text color="textSecondary" style={styles.characterCount}>
            Maximum 70 characters
          </Text>
        </View>

        <View style={styles.formSection}>
          <Text variant="titleLg" style={styles.descriptionLabel}>
            Describe what need doing
          </Text>
          <View style={styles.descriptionInputWrapper}>
            <Input
              multiline
              textAlignVertical="top"
              placeholder="Describe what you need done..."
              value={description}
              onChangeText={setDescription}
              style={styles.descriptionInputInner}
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text variant="titleLg">Select a specific date & time slot</Text>
          <Text color="textSecondary">
            Select a date & time slot for your event
          </Text>
          <View style={styles.inputGroup}>
            <Pressable
              style={styles.inputWrapper}
              onPress={() => setPickerMode("date")}
            >
              <CalendarDays size={20} color={theme.colors.textSecondary} />
              <Input
                placeholder="Choose your date"
                value={date?.toLocaleDateString()}
                editable={false}
                pointerEvents="none"
                style={styles.input}
              />
            </Pressable>
            <Pressable
              style={styles.inputWrapper}
              onPress={() => setPickerMode("time")}
            >
              <Clock3 size={20} color={theme.colors.textSecondary} />
              <Input
                placeholder="Select your time slot"
                value={time?.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                editable={false}
                pointerEvents="none"
                style={styles.input}
              />
            </Pressable>
          </View>
          {pickerMode && (
            <DateTimePicker
              value={
                pickerMode === "date"
                  ? (date ?? new Date())
                  : (time ?? new Date())
              }
              mode={pickerMode}
              display="default"
              onValueChange={handlePickerValueChange}
              onDismiss={handlePickerDismiss}
            />
          )}
        </View>

        <View style={styles.formSection}>
          <Text variant="titleLg" style={styles.locationLabel}>
            Choose a specific location
          </Text>
          <Text color="textSecondary">
            Select a specific address for your event
          </Text>
          <View style={styles.locationInputWrapper}>
            <MapPin size={20} color={theme.colors.textSecondary} />
            <Input
              placeholder="Choose your location"
              value={location}
              onChangeText={setLocation}
              style={styles.locationInput}
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text variant="titleMd" style={styles.budgetLabel}>
            Enter your budget for the event
          </Text>
          <Text color="textSecondary">Enter your budget for the event.</Text>
          <View style={styles.budgetInputWrapper}>
            <Banknote size={20} color={theme.colors.textSecondary} />
            <Input
              placeholder="₹0"
              value={budget}
              onChangeText={setBudget}
              keyboardType="numeric"
              style={styles.budgetInput}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label="Update"
          variant="primary"
          fullWidth
          onPress={handleSave}
          style={styles.saveButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditEventScreen;

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
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  formSection: {
    marginBottom: 24,
  },
  titleLabel: {
    marginTop: 8,
  },
  descriptionLabel: {
    marginBottom: 8,
  },
  budgetLabel: {
    marginBottom: 4,
  },
  locationLabel: {
    marginBottom: 8,
  },
  titleInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 12,
  },
  titleInputInner: {
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 16,
  },
  descriptionInputWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 12,
    marginTop: 12,
  },
  descriptionInputInner: {
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 12,
  },
  characterCount: {
    textAlign: "right",
    marginTop: 4,
  },
  inputGroup: {
    gap: 12,
    marginTop: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 16,
  },
  locationInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  locationInput: {
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 16,
  },
  budgetInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 12,
  },
  budgetInput: {
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 16,
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  saveButton: {
    height: 52,
  },
});
