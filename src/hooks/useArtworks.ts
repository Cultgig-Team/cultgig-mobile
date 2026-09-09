import { useQuery } from "@tanstack/react-query";
import { artworkService, artistProfileService } from "../services/artworkService";

/**
 * HOOK: useArtworkFeed
 * -------------------------------------------------------
 * This is the pattern for every piece of server data in the
 * app: service function + React Query hook. Components call
 * the hook and get { data, isLoading, error } for free —
 * caching, retries, and refetch-on-focus all handled.
 */
export const useArtworkFeed = () => {
  return useQuery({
    queryKey: ["artworks", "feed"],
    queryFn: artworkService.getFeed,
  });
};

export const useArtworkDetail = (id: string) => {
  return useQuery({
    queryKey: ["artworks", id],
    queryFn: () => artworkService.getById(id),
    enabled: Boolean(id),
  });
};

export const usePopularEvents = () => {
  return useQuery({
    queryKey: ["events", "popular"],
    queryFn: artworkService.getPopularEvents,
  });
};

export const usePopularEventDetail = (id: number) => {
  return useQuery({
    queryKey: ["events", "popular", id],
    queryFn: () => artworkService.getPopularEventById(id),
    enabled: Boolean(id),
  });
};

export const useArtistSearch = (params: {
  query: string;
  category: string;
  location?: string;
  gender?: string;
  minPrice?: string;
  maxPrice?: string;
}) => {
  return useQuery({
    queryKey: [
      "artists",
      "search",
      params.query,
      params.category,
      params.location,
      params.gender,
      params.minPrice,
      params.maxPrice,
    ],
    queryFn: () =>
      artistProfileService.searchArtists({
        query: params.query || undefined,
        category: params.category || undefined,
        location: params.location || undefined,
        gender: params.gender || undefined,
        minPrice: params.minPrice ? Number(params.minPrice) : undefined,
        maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      }),
    enabled:
      params.query.length > 0 ||
      params.category.length > 0 ||
      Boolean(params.location) ||
      Boolean(params.gender) ||
      Boolean(params.minPrice) ||
      Boolean(params.maxPrice),
  });
};

