import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { theme } from "../../../theme";
import { MapPin, Heart } from "lucide-react-native";
import { Text } from "../../atoms";
import { ArtistProfile } from "../../../services/artworkService";

// ─── Artist Profile Card ────────────────────────────────────────────────────
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 40; // full width minus horizontal padding

export const ArtistProfileCard = ({ artist }: { artist: ArtistProfile }) => (
  <View style={cardStyles.card}>
    <Image
      source={{ uri: artist.profileImgUrl }}
      style={cardStyles.avatar}
      resizeMode="cover"
    />
    <View style={cardStyles.cardBody}>
      <View style={cardStyles.title}>
        <Text variant="h3" style={cardStyles.name} numberOfLines={1}>
          {artist.name}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Heart size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
      <Text variant="bodySmall" color="textSecondary" numberOfLines={2}>
        {artist.bio}
      </Text>
      <View style={cardStyles.locationAndPrice}>
        <View style={cardStyles.location}>
          <MapPin size={16} color={theme.colors.textSecondary} />
          <Text
            variant="bodySmall"
            color="textSecondary"
            style={cardStyles.locationText}
            numberOfLines={1}
          >
            {artist.location.split(",")[0]}
          </Text>
        </View>
        <Text variant="bodySmallBold">
          ₹500<Text color="textSecondary">/hr</Text>
        </Text>
      </View>
    </View>
  </View>
);

const cardStyles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 12,
    flexDirection: "row",
    overflow: "hidden",
  },
  avatar: {
    width: 104,
    height: "100%",
  },
  cardBody: {
    flex: 1,
    padding: 14,
    gap: 8,
    justifyContent: "space-between",
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontWeight: "700",
    flex: 1,
  },
  locationAndPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },
  locationText: {
    flexShrink: 1,
  },
  //   price: {
  //     fontWeight: "700",
  //     color: theme.colors.textPrimary,
  //   },
});
