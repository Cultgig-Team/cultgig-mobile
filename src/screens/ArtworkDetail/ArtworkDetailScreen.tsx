import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text } from '../../components/atoms/Text';
import { useArtworkDetail } from '../../hooks/useArtworks';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type ArtworkDetailRouteProp = RouteProp<RootStackParamList, 'ArtworkDetail'>;

export const ArtworkDetailScreen = () => {
  const route = useRoute<ArtworkDetailRouteProp>();
  const { artworkId } = route.params;
  const { data: artwork, isLoading } = useArtworkDetail(artworkId);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="h2">{artwork?.title ?? 'Artwork'}</Text>
      <Text variant="body" color="textSecondary">
        by {artwork?.artistName ?? 'Unknown artist'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
