import { Image, ImageSourcePropType, Text, View } from "react-native";

function InboxEmptyState({
  image,
  description,
  heading,
}: {
  description?: string;
  heading?: string;
  image?: ImageSourcePropType;
}) {
  return (
    <View className="flex-1 items-center justify-center px-8 pb-16">
      {/* Empty illustration */}
      <Image source={image} className="w-72 h-72 mb-6" resizeMode="contain" />

      <Text className="text-2xl font-bold text-neutral-900 text-center mb-2">
        {heading}
      </Text>

      <Text className="text-base text-neutral-500 text-center leading-6 max-w-xs">
        {description}
      </Text>
    </View>
  );
}
export default InboxEmptyState;
