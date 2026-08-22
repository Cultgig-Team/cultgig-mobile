import { apiClient } from "./apiClient";
import { popularEvents } from "assets/dummyData/popular-events";

export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  artistName: string;
  artistId: string;
  likesCount: number;
}

export interface PopularEvent {
  id: number;
  title: string;
  location: string;
  budget: number;
  featureImage: string;
  startsAt: string;
  eventDescription: string;
  thingsToKnow: {
    location: string;
    date: string;
    time: string;
    budget: string;
  };
  gallery: string[];
  createdAt: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  profileImage: string;
}

/**
 * Plain async functions — no React here. These get wrapped
 * by React Query hooks (see src/hooks/useArtworks.ts) which
 * handle caching, loading/error states, and refetching.
 */
export const artworkService = {
  getFeed: async (): Promise<Artwork[]> => {
    const { data } = await apiClient.get("/artworks/feed");
    return data;
  },

  getById: async (id: string): Promise<Artwork> => {
    const { data } = await apiClient.get(`/artworks/${id}`);
    return data;
  },

  getPopularEvents: async (): Promise<PopularEvent[]> => {
    return popularEvents;
  },

  getPopularEventById: async (
    id: number,
  ): Promise<PopularEvent | undefined> => {
    return popularEvents.find((event) => event.id === id);
  },
};
