import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { Button, Text } from "@/components";
import { theme } from "../../theme";
import type { User } from "../../services/artworkService";

interface UserDetailScreenProps {
  user: User;
  onBack?: () => void;
}

export const UserDetailScreen: React.FC<UserDetailScreenProps> = ({
  user,
  onBack,
}) => {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <ChevronLeft
            size={30}
            strokeWidth={1.8}
            color={theme.colors.textPrimary}
          />
        </Pressable>
      </View>

      <View style={styles.profileCard}>
        <Image source={{ uri: user.profileImage }} style={styles.avatar} />
        <Text variant="h2" style={styles.name}>
          {user.name}
        </Text>
        <Text variant="body" color="textSecondary" style={styles.meta}>
          Creator profile
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text variant="h3" style={styles.sectionTitle}>
          About
        </Text>
        <Text variant="body" color="textSecondary">
          This user is the organiser for this event and can be contacted through
          the platform to discuss details, opportunities, and collaboration.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button label="Back to Event" onPress={onBack} fullWidth />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  profileCard: {
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.backgroundSecondary,
    marginBottom: theme.spacing.md,
  },
  name: {
    marginBottom: theme.spacing.xs,
  },
  meta: {
    textAlign: "center",
  },
  infoCard: {
    marginHorizontal: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sectionTitle: {
    marginBottom: theme.spacing.sm,
  },
  footer: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    marginTop: "auto",
    paddingBottom: theme.spacing.md,
  },
});
