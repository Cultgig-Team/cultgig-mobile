import { apiClient } from "./apiClient";
import { popularEvents } from "assets/dummyData/popular-events";
import { artistProfiles } from "assets/dummyData/artist-profiles";

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

export interface ArtistProfile {
  id: number;
  name: string;
  gender: string;
  profileImgUrl: string;
  location: string;
  category: string;
  bio: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
  };
  createdAt: string;
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

export interface ArtistSearchParams {
  query?: string;
  category?: string;
  location?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * Artist profile service — currently backed by local dummy data.
 * Swap getArtists / searchArtists to real API calls when the endpoint is ready.
 */
export const artistProfileService = {
  /** Returns all artists, optionally filtered by search query, category, location, gender */
  searchArtists: async (params: ArtistSearchParams): Promise<ArtistProfile[]> => {
    // Simulate network latency for realistic loading state
    await new Promise((resolve) => setTimeout(resolve, 300));

    let results = [...artistProfiles] as ArtistProfile[];

    if (params.category) {
      results = results.filter((a) =>
        a.category.toLowerCase().includes(params.category!.toLowerCase()),
      );
    }

    if (params.query) {
      const q = params.query.toLowerCase();
      results = results.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q),
      );
    }

    if (params.location) {
      const loc = params.location.toLowerCase();
      results = results.filter((a) =>
        a.location.toLowerCase().includes(loc),
      );
    }

    if (params.gender) {
      results = results.filter(
        (a) => a.gender.toLowerCase() === params.gender!.toLowerCase(),
      );
    }

    return results;
  },
};

