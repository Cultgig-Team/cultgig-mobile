import { StyleSheet, View, Image } from "react-native";
import { Text } from "../../atoms/Text";

const STEPS = [
  {
    imageSource: require("../../../../assets/images/Mail-bro.png"),
    title: "Post what you need",
    description:
      "Post what you need what you’re looking for. Let the right talent find you.",
  },
  {
    imageSource: require("../../../../assets/images/Instant-information-cuate.png"),
    title: "Compare & message",
    description:
      "Compare artists side-by-side &message the right one directly.",
  },
  {
    imageSource: require("../../../../assets/images/Verified-amico.png"),
    title: "Every artist is phone-verified",
    description: "Real artists. Real identities. More trust behind every gig.",
  },
  {
    imageSource: require("../../../../assets/images/Self confidence-rafiki.png"),
    title: "Book with confidence",
    description:
      "Find the right talent, verify their work, and chat with complete peace of mind",
  },
];

export const HowCultgigWorks = () => (
  <View>
    <Text variant="h2" style={{ paddingTop: 31, paddingBottom: 16 }}>
      How Cultgig works
    </Text>
    <View style={{ gap: 12 }}>
      {STEPS.map(({ imageSource: imageSource, title, description }) => (
        <View key={title} style={styles.item}>
          <View>
            <Image source={imageSource} style={styles.image} />
          </View>
          <View style={{ width: 249, gap: 4 }}>
            <Text variant="titleLg">{title}</Text>
            <Text color="textSecondary">{description}</Text>
          </View>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  image: {
    width: 92,
    height: 92,
    resizeMode: "contain",
  },
});
