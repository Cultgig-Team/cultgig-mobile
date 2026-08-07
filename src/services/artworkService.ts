import { apiClient } from './apiClient';

export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  artistName: string;
  artistId: string;
  likesCount: number;
}

/**
 * Plain async functions — no React here. These get wrapped
 * by React Query hooks (see src/hooks/useArtworks.ts) which
 * handle caching, loading/error states, and refetching.
 */
export const artworkService = {
  getFeed: async (): Promise<Artwork[]> => {
    const { data } = await apiClient.get('/artworks/feed');
    return data;
  },

  getById: async (id: string): Promise<Artwork> => {
    const { data } = await apiClient.get(`/artworks/${id}`);
    return data;
  },
};
