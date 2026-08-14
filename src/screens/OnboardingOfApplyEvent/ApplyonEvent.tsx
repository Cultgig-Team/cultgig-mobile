import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../components/atoms/Text";

interface ApplyOnEventProps {}

export const ApplyOnEvent: React.FC<ApplyOnEventProps> = () => {
  return (
    <View style={styles.container}>
      <Text variant="h2">Apply on event</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
