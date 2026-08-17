import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell, FileText, FileCheck, Star, Eye } from "lucide-react-native";
import { usePopularEvents } from "../../hooks/useArtworks";
import EventCard from "../../components/templates/EventCard/EventCard";
import { useOnboardingStore } from "../../store/onboardingStore";
import { theme } from "../../theme";

// --- DUMMY DATA ---
const AVATAR_URL = "https://randomuser.me/api/portraits/men/32.jpg";

// --- REUSABLE COMPONENTS ---

// 1. Activity Card Component
const ActivityCard = ({
  icon: Icon,
  count,
  label,
}: {
  icon: any;
  count: string | number;
  label: string;
}) => (
  <View className="bg-white rounded-2xl p-4 w-[48%] mb-4 border border-gray-100 shadow-sm">
    <View className="flex-row justify-between items-center mb-3">
      <View className="w-10 h-10 rounded-full bg-purple-50 items-center justify-center">
        <Icon size={20} color="#a855f7" />
      </View>
      <Text className="text-2xl font-extrabold text-gray-900">{count}</Text>
    </View>
    <Text className="text-gray-500 font-medium">{label}</Text>
  </View>
);

// --- MAIN SCREEN ---
export default function HomeScreen() {
  const primaryIntent = useOnboardingStore((state) => state.primaryIntent);
  const role = primaryIntent ?? "artist";

  const {
    data: popularEvents,
    isLoading: eventsLoading,
    error: eventsError,
  } = usePopularEvents();

  // --- CLIENT ROLE: placeholder dashboard ---
  if (role === "client") {
    return (
      <SafeAreaView style={{ flex: 1 }} className="bg-white">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-2xl font-extrabold text-gray-900 mb-2">
            Coming Soon
          </Text>
          <Text className="text-gray-500 text-center">
            The client dashboard is under construction. Please check back later.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // --- ARTIST ROLE: Home screen---
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header */}
        <View className="flex-row justify-between items-center px-6 pt-4 pb-2">
          <TouchableOpacity>
            <Image
              source={{ uri: AVATAR_URL }}
              className="w-11 h-11 rounded-full border border-gray-200"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Bell size={26} color="#1f2937" />
          </TouchableOpacity>
        </View>

        <View className="flex-1 px-6">
          {/* My Activity Section */}
          <Text className="text-2xl font-extrabold text-gray-900 mt-6 mb-4">
            My Activity
          </Text>

          <View className="flex-row flex-wrap justify-between">
            <ActivityCard icon={FileText} count="5" label="Applied Gigs" />
            <ActivityCard icon={FileCheck} count="0" label="Active Gigs" />
            <ActivityCard icon={Star} count="12" label="Total Rating" />
            <ActivityCard icon={Eye} count="10k" label="Total Views" />
          </View>

          {/* Popular Gigs Section */}
          <Text className="text-xl font-extrabold text-gray-900 mt-6 mb-4">
            Popular Events near you
          </Text>

          {eventsLoading && (
            <ActivityIndicator
              style={styles.loader}
              color={theme.colors.primary}
            />
          )}

          {eventsError && (
            <Text style={styles.padded}>Couldn't load popular events.</Text>
          )}
          {!eventsLoading && !eventsError && (
            <FlatList
              data={popularEvents ?? []}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <EventCard event={item} />}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  list: {
    paddingHorizontal: theme.spacing.md,
  },
  loader: {
    marginTop: theme.spacing.xl,
  },
  padded: {
    paddingVertical: theme.spacing.md,
  },
  card: {
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
  },
});
