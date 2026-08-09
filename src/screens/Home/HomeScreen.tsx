import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bell,
  FileText,
  FileCheck,
  Star,
  Eye,
  Bookmark,
  MapPin,
  Clock,
  Calendar,
} from "lucide-react-native";

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

// 2. Gig Card Component
const GigCard = () => (
  <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-200 shadow-sm">
    {/* Card Header */}
    <View className="flex-row justify-between items-center mb-3">
      <View className="flex-row items-center gap-2">
        <Image source={{ uri: AVATAR_URL }} className="w-6 h-6 rounded-full" />
        <Text className="text-gray-500 text-sm font-medium">
          Posted by Rajesh
        </Text>
      </View>
      <TouchableOpacity>
        <Bookmark size={22} color="#1f2937" />
      </TouchableOpacity>
    </View>

    {/* Gig Title */}
    <Text className="text-lg font-bold text-gray-900 mb-4 leading-tight">
      Hiring experienced Content Writers & photographers...
    </Text>

    {/* Details Section */}
    <View className="flex-col gap-2">
      <View className="flex-row items-center gap-2">
        <MapPin size={16} color="#6b7280" />
        <Text className="text-gray-600 font-medium">Maharashtra, Mumbai</Text>
      </View>

      <View className="flex-row items-center gap-2">
        <Clock size={16} color="#6b7280" />
        <Text className="text-gray-600 font-medium">9:00 AM</Text>
      </View>

      {/* Date and Price Row */}
      <View className="flex-row justify-between items-center mt-1">
        <View className="flex-row items-center gap-2">
          <Calendar size={16} color="#6b7280" />
          <Text className="text-gray-600 font-medium">On Wed, 28 Sept</Text>
        </View>
        <Text className="text-lg font-extrabold text-gray-900">₹5,000</Text>
      </View>
    </View>
  </View>
);

// --- MAIN SCREEN ---
export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
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

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
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
          Popular gigs near you
        </Text>

        <GigCard />
        <GigCard />

        {/* Extra padding at the bottom so content isn't hidden behind the tab bar */}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
