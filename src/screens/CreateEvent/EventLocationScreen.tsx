import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, MapPin, X } from "lucide-react-native";
import { Button, Input, SegmentedProgress } from "../../components";
import { Text } from "../../components/atoms/Text";
import { theme } from "../../theme";

interface EventLocationScreenProps {
  onBack: () => void;
  onContinue: (location: string, addressDetails: string) => void;
}

export const EventLocationScreen: React.FC<EventLocationScreenProps> = ({
  onBack,
  onContinue,
}) => {
  const [location, setLocation] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.progressHeader}>
          <ChevronLeft size={32} strokeWidth={1.5} onPress={onBack} />
          <SegmentedProgress currentStep={3} totalSteps={5} />
          <X />
        </View>

        <View style={styles.formContent}>
          <Text variant="h1">Hey, choose a specific city for your event</Text>
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
          <Text variant="titleMd">
            Enter your address in details (Optional)
          </Text>
          <View>
            <Input
              multiline
              textAlignVertical="top"
              placeholder="Enter your address details"
              value={addressDetails}
              onChangeText={setAddressDetails}
              style={styles.addressInput}
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
            onPress={() => onContinue(location.trim(), addressDetails.trim())}
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
  addressInput: {
    minHeight: 140,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  characterCount: {
    textAlign: "right",
  },
  bottomAction: {
    marginTop: "auto",
    paddingTop: 24,
  },
  continueButton: {
    height: 52,
  },
});
