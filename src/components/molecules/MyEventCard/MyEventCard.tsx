import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Modal,
  Dimensions,
  Alert,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {
  MapPin,
  Calendar,
  EllipsisVerticalIcon,
  Pause,
  Play,
  Trash2,
  SquarePen,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "../../atoms/Text";
import { theme } from "../../../theme";
import { MyEvent } from "@/services/artworkService";
import { RootStackParamList } from "../../../navigation/types";

export interface MyEventCardProps {
  event: MyEvent;
  onPress?: () => void;
  onPause?: (event: MyEvent) => void;
  onContinue?: (event: MyEvent) => void;
  onDelete?: (event: MyEvent) => void;
  onEdit?: (event: MyEvent) => void;
  rightIcon?: "menu" | "edit";
  backgroundColor?: string;
  gradientColors?: readonly [string, string, ...string[]];
  applicantsColor?: "primary" | "textSecondary" | "textPrimary";
  variant?: "default" | "detail";
  cardStyle?: StyleProp<ViewStyle>;
}

export const MyEventCard: React.FC<MyEventCardProps> = ({
  event,
  onPress,
  onPause,
  onContinue,
  onDelete,
  onEdit,
  rightIcon,
  backgroundColor,
  gradientColors,
  applicantsColor,
  variant = "default",
  cardStyle,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const buttonRef = useRef<View>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 16 });

  const isDetail = variant === "detail";
  const effectiveRightIcon = rightIcon ?? (isDetail ? "edit" : "menu");
  const isGradientBg =
    typeof backgroundColor === "string" && backgroundColor.includes("gradient");
  const effectiveGradient: readonly [string, string, ...string[]] | undefined =
    gradientColors ??
    (isGradientBg
      ? (["#FAF2F9", "#FFFFFF"] as const)
      : undefined);
  const effectiveBgColor = effectiveGradient
    ? undefined
    : (backgroundColor ?? (isDetail ? "#D9D9D9" : "#FFFFFF"));
  const effectiveApplicantsColor =
    applicantsColor ?? (isDetail ? "primary" : undefined);
  const isDetailMode = isDetail || effectiveRightIcon === "edit";

  const handleCardPress = () => {
    if (onPress) {
      onPress();
    } else if (!isDetail && effectiveRightIcon !== "edit") {
      navigation.navigate("MyEventDetails", { eventId: event.id });
    }
  };

  const handleEditPress = () => {
    if (onEdit) {
      onEdit(event);
    }
  };

  const handleMenuPress = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setMenuPos({
        top: y + height + 4,
        right: Math.max(16, Dimensions.get("window").width - (x + width)),
      });
      setMenuVisible(true);
    });
  };

  const handlePausePress = () => {
    setMenuVisible(false);
    if (onPause) {
      onPause(event);
    } else {
      Alert.alert("Event Paused", `Applications for "${event.title}" have been paused.`);
    }
  };

  const handleContinuePress = () => {
    setMenuVisible(false);
    if (onContinue) {
      onContinue(event);
    } else {
      Alert.alert("Event Continued", `"${event.title}" is now active and continuing.`);
    }
  };

  const handleDeletePress = () => {
    setMenuVisible(false);
    if (onDelete) {
      onDelete(event);
    } else {
      Alert.alert(
        "Delete Event",
        `Are you sure you want to delete "${event.title}"?`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: () => {} },
        ]
      );
    }
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          effectiveBgColor ? { backgroundColor: effectiveBgColor } : null,
          cardStyle,
          pressed && !isDetail && styles.cardPressed,
        ]}
        onPress={handleCardPress}
        accessibilityRole="button"
      >
        {effectiveGradient && (
          <LinearGradient
            colors={effectiveGradient}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 0.98, y: 0.4 }}
            locations={[0.0237, 0.9868]}
            style={[StyleSheet.absoluteFill, { borderRadius: 16 }]}
          />
        )}
        {/* Top bar: Badge + Action Icon */}
        <View style={styles.cardTopBar}>
          <View style={styles.statusBadge}>
            <Text variant="caption" style={styles.statusBadgeText}>
              Application Open
            </Text>
          </View>

          {effectiveRightIcon === "edit" ? (
            <TouchableOpacity
              onPress={handleEditPress}
              style={styles.moreButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityLabel="Edit event"
            >
              <SquarePen
                size={24}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              ref={buttonRef}
              onPress={handleMenuPress}
              style={styles.moreButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityLabel="Event options"
            >
              <EllipsisVerticalIcon
                size={24}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Event Title */}
        <Text
          variant="titleMd"
          style={[styles.title, isDetailMode && styles.titleDetail]}
          numberOfLines={2}
        >
          {event.title}
        </Text>

        {/* Info list */}
        <View style={styles.infoStack}>
          <View style={styles.infoRow}>
            <Calendar size={16} color={theme.colors.textSecondary} />
            <Text
              variant="bodySmall"
              color="textSecondary"
              style={styles.infoText}
              numberOfLines={1}
            >
              {event.thingsToKnow?.date ?? event.startsAt}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MapPin size={16} color={theme.colors.textSecondary} />
            <Text
              variant="bodySmall"
              color="textSecondary"
              style={styles.infoText}
              numberOfLines={1}
            >
              {event.location ?? event.thingsToKnow?.location}
            </Text>
          </View>
        </View>

        {/* Card Footer */}
        <View style={styles.cardFooter}>
          <Text variant="titleLg" style={styles.footerActionText}>
            {event.budget}
            <Text variant="body" color="textSecondary">
              /hr
            </Text>
          </Text>
          <Text variant="bodySmall" color={effectiveApplicantsColor}>
            {2} applicants
          </Text>
        </View>
      </Pressable>

      {/* 3-dot Menu Dropdown Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.menuBackdrop}
          onPress={() => setMenuVisible(false)}
        >
          <View
            style={[
              styles.menuDropdown,
              {
                top: menuPos.top,
                right: menuPos.right,
              },
            ]}
          >
            {/* Pause Option */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handlePausePress}
              activeOpacity={0.7}
            >
              <Pause size={18} color={theme.colors.textPrimary} />
              <Text variant="bodySmall" style={styles.menuItemText}>
                Pause
              </Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            {/* Continue Option */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleContinuePress}
              activeOpacity={0.7}
            >
              <Play size={18} color={theme.colors.textPrimary} />
              <Text variant="bodySmall" style={styles.menuItemText}>
                Continue
              </Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            {/* Delete Option */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleDeletePress}
              activeOpacity={0.7}
            >
              <Trash2 size={18} color="#DC2626" />
              <Text
                variant="bodySmall"
                style={[styles.menuItemText, { color: "#DC2626" }]}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    overflow: "hidden",
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  cardTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  statusBadge: {
    backgroundColor: "#00521A1A",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    color: "#00521A",
    fontWeight: "700",
    fontSize: 12,
  },
  budgetText: {
    color: theme.colors.primary,
    fontWeight: "800",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 22,
    marginBottom: 12,
  },
  titleDetail: {
    fontSize: 20,
    lineHeight: 26,
  },
  infoStack: {
    gap: 8,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    flex: 1,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerActionText: {
    fontWeight: "700",
  },
  moreButton: {
    padding: 4,
    borderRadius: 8,
  },
  menuBackdrop: {
    flex: 1,
    backgroundColor: "transparent",
  },
  menuDropdown: {
    position: "absolute",
    width: 148,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  menuItemText: {
    fontWeight: "600",
    color: "#1F2937",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginHorizontal: 8,
  },
});
