import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, CrossIcon, X } from "lucide-react-native";
import { Button, SegmentedProgress } from "../../components";
import { Input } from "../../components/atoms/Input";
import { Text } from "../../components/atoms/Text";
import { theme } from "../../theme";

interface CreateEventScreenProps {
  onBack: () => void;
  onContinue: (title: string, description: string) => void;
}

export const CreateEventScreen: React.FC<CreateEventScreenProps> = ({
  onBack,
  onContinue,
}) => {
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.progressHeader}>
          <ChevronLeft size={32} strokeWidth={1.5} onPress={onBack} />
          <SegmentedProgress currentStep={1} totalSteps={5} />
          <X />
        </View>
        <View style={styles.formContent}>
          <Text variant="h1" style={styles.titleLabel}>
            Start with a title
          </Text>
          <Text color="textSecondary">
            In few words what do you need to done ?
          </Text>
          <View>
            <Input
              value={eventTitle}
              onChangeText={setEventTitle}
              style={styles.titleInput}
              placeholder="Event Title"
            />
            <Text color="textSecondary" style={styles.characterCount}>
              Maximum 70 characters
            </Text>
          </View>

          <Text variant="titleLg" style={styles.descriptionLabel}>
            Describe what need doing
          </Text>
          <View>
            <Input
              multiline
              textAlignVertical="top"
              placeholder="Describe what you need done..."
              value={description}
              onChangeText={setDescription}
              style={styles.descriptionInput}
            />
            <Text color="textSecondary" style={styles.characterCount}>
              Maximum 500 characters
            </Text>
          </View>
        </View>
        <View style={styles.bottomAction}>
          <Button
            label="Continue"
            fullWidth
            disabled={!eventTitle.trim() || !description.trim()}
            onPress={() => onContinue(eventTitle.trim(), description.trim())}
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
  titleLabel: {
    marginTop: 8,
  },
  titleInput: {
    paddingVertical: 12,
  },
  characterCount: {
    textAlign: "right",
  },
  descriptionLabel: {
    marginBottom: 8,
  },
  descriptionInput: {
    minHeight: 140,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  continueButton: {
    height: 52,
  },
  bottomAction: {
    marginTop: "auto",
    paddingTop: 24,
  },
});
