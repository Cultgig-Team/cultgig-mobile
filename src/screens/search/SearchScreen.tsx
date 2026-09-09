import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className="flex-1 items-center justify-center bg-white"
    >
      <Text className="text-xl font-bold text-gray-900">Search</Text>
    </SafeAreaView>
  );
};

export default SearchScreen;
