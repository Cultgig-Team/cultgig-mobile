import { useQuery } from "@tanstack/react-query";
import { artworkService } from "../services/artworkService";

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
