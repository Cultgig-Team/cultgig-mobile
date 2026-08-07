import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/atoms/Text';
import { useArtworkFeed } from '../../hooks/useArtworks';
import { theme } from '../../theme';

/**
 * SCREEN: Home
 * -------------------------------------------------------
 * Screens compose organisms/molecules/atoms + hooks. They
 * should contain minimal styling logic themselves — layout
 * glue only. Once you share the Home design, this becomes
 * the real feed (ArtworkGrid organism, Header organism, etc).
 */
export const HomeScreen = () => {
  const { data: artworks, isLoading, error } = useArtworkFeed();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text variant="h1">Discover</Text>
        <Text variant="body" color="textSecondary">
          Fresh work from artists you follow
        </Text>
      </View>

      {isLoading && <ActivityIndicator style={styles.loader} color={theme.colors.primary} />}

      {error && (
        <Text variant="body" color="error" style={styles.padded}>
          Couldn't load the feed. Pull to refresh once your API is connected.
        </Text>
      )}

      {!isLoading && !error && (
        <FlatList
          data={artworks ?? []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text variant="body" color="textSecondary" style={styles.padded}>
              No artworks yet — connect your API to see the real feed here.
            </Text>
          }
          renderItem={({ item }) => (
            <Text variant="body" style={styles.padded}>
              {item.title} — {item.artistName}
            </Text>
          )}
        />
      )}
    </SafeAreaView>
  );
};

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
});
