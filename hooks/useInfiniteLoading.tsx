import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

export default function useInfiniteLoading<T>({
  queryKey,
  queryFn,
  initialPageParam,
  getNextPageParam,
}: {
  queryKey: string[];
  queryFn: (params: { pageParam: string }) => Promise<T>;
  initialPageParam: string;
  getNextPageParam: (lastPage: T) => string | undefined;
}) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam,
    getNextPageParam,
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return {
    data,
    isError,
    isLoading,
    lastElementRef,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
