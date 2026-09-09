import { ChevronLeft, MoreVertical } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import { Text } from "../ui/text";
import { useNavigation } from "@react-navigation/native";

interface CustomNavInterface {
  header: string;
  image: string;
}

export const CustomHeader = ({ header, image }: CustomNavInterface) => {
  const navigate = useNavigation();

  return (
    <View className="flex-row items-center justify-between px-4 py-3 border-b border-neutral-100">
      <View className="flex-row items-center">
        <Pressable onPress={() => navigate.goBack()} className="p-2 mr-1">
          <ChevronLeft size={24} color="#171717" />
        </Pressable>
        <View className="w-10 h-10 rounded-full bg-neutral-200 mr-3 overflow-hidden items-center justify-center">
          {image ? (
            <Image source={{ uri: image }} className="w-full h-full" />
          ) : (
            <Text className="font-bold text-neutral-600">
              {header?.charAt(0)}
            </Text>
          )}
        </View>
        <Text className="text-lg font-bold text-neutral-900">{header}</Text>
      </View>
      <Pressable className="p-2">
        <MoreVertical size={24} color="#171717" />
      </Pressable>
    </View>
  );
};
