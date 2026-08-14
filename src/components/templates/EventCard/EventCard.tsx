import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Bookmark, MapPin, Clock2, Calendar } from "lucide-react-native";
import { Text } from "../../atoms/Text";
import { PopularEvent } from "@/services/artworkService";
import { RootStackParamList } from "../../../navigation/types";

function EventCard({ event }: { event: PopularEvent }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate("EventDetail", { eventId: event.id })}
    >
      <View style={styles.cardHeaderAndFooter}>
        <View style={styles.locationAndTime}>
          <Image
            source={{ uri: event.user.profileImage }}
            style={{
              width: 28,
              height: 28,
              borderRadius: 4,
            }}
          />
          <Text>Posted by {event.user?.name}</Text>
        </View>
        <TouchableOpacity>
          <Bookmark />
        </TouchableOpacity>
      </View>

      <View>
        <Text variant="titleLg" style={{ paddingTop: 10, paddingBottom: 10 }}>
          {event.title}
        </Text>
        <View style={styles.locationAndTime}>
          <MapPin />
          <Text variant="body">
            {event.location ?? event.thingsToKnow?.location}
          </Text>
        </View>
        <View style={styles.locationAndTime}>
          <Clock2 />
          <Text variant="body">
            {event.thingsToKnow?.time ?? event.startsAt}
          </Text>
        </View>
        <View style={styles.cardHeaderAndFooter}>
          {/* //leftside  */}
          <View style={styles.locationAndTime}>
            <Calendar />
            <Text variant="body">
              {event.thingsToKnow?.date ?? event.startsAt}
            </Text>
          </View>
          {/* rightside */}
          <Text variant="titleMd">₹{event.budget}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default EventCard;
const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D9D9D9",
    borderRadius: 16,
    padding: 16,
  },
  cardHeaderAndFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationAndTime: {
    flexDirection: "row",
    gap: 13.75,
    padding: 4,
    alignItems: "center",
  },
});
