import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CalendarDays, ChevronLeft, Clock3, X } from "lucide-react-native";
import DateTimePicker, {
  DateTimePickerChangeEvent,
} from "@react-native-community/datetimepicker";
import { Button, SegmentedProgress } from "../../components";
import { Input } from "../../components/atoms/Input";
import { Text } from "../../components/atoms/Text";
import { theme } from "../../theme";

interface TimeDateScreenProps {
  onBack: () => void;
  onContinue: (date: string, time: string) => void;
}

export const TimeDateScreen: React.FC<TimeDateScreenProps> = ({
  onBack,
  onContinue,
}) => {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [pickerMode, setPickerMode] = useState<"date" | "time" | null>(null);

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

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.progressHeader}>
          <ChevronLeft size={32} strokeWidth={1.5} onPress={onBack} />
          <SegmentedProgress currentStep={2} totalSteps={5} />
          <X />
        </View>

        <View style={styles.formContent}>
          <Text variant="h1">Select a specific date & time slot</Text>
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
                placeholder="Select your time slote"
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
              onNeutralButtonPress={handlePickerDismiss}
            />
          )}
        </View>

        <View style={styles.bottomAction}>
          <Button
            label="Continue"
            fullWidth
            disabled={!date || !time}
            onPress={() =>
              onContinue(
                date!.toLocaleDateString(),
                time!.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              )
            }
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
  inputGroup: {
    gap: 12,
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
  bottomAction: {
    marginTop: "auto",
    paddingTop: 24,
  },
  continueButton: {
    height: 52,
  },
});
