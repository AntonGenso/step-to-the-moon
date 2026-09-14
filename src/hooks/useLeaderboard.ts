'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  subscribeLeaderboard,
  type LeaderboardEntry,
  type LeaderboardPage,
} from '@/src/services/userService';

/** Rows per page — the board is paged instead of capped at a single long list. */
export const LEADERBOARD_PAGE_SIZE = 50;

/** Wait after the last keystroke before the search hits the server. */
const SEARCH_DEBOUNCE_MS = 300;

interface Options {
  /** Overrides the default page size (the admin widget shows a short top-N). */
  pageSize?: number;
}

export interface UseLeaderboard {
  players: LeaderboardEntry[];
  page: number;
  totalPages: number;
  /** Rows matching the current search and scope, across every page. */
  total: number;
  loading: boolean;
  /** Raw input value — the request itself is debounced. */
  search: string;
  myClassOnly: boolean;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setMyClassOnly: (only: boolean) => void;
}

/**
 * One page of the leaderboard, kept fresh by polling.
 *
 * Paging and both filters are resolved by the server: the name search because
 * the client only ever holds one page, and the class filter because the client
 * has no idea which class anyone is in — the backend reads it off the session.
 */
export function useLeaderboard({ pageSize = LEADERBOARD_PAGE_SIZE }: Options = {}): UseLeaderboard {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [myClassOnly, setMyClassOnly] = useState(false);
  const [data, setData] = useState<LeaderboardPage | null>(null);
  const [loading, setLoading] = useState(true);

  // Typing shouldn't fire a request per keystroke.
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [search]);

  // A narrower result set makes the current page number meaningless.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, myClassOnly]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeLeaderboard(
      { page, pageSize, search: debouncedSearch, myClassOnly },
      (next) => {
        setData(next);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [page, pageSize, debouncedSearch, myClassOnly]);

  return useMemo(
    () => ({
      players: data?.entries ?? [],
      // Before the first response, report the page being asked for — the pager
      // shouldn't jump back to 1 while the request is in flight.
      page: data?.page ?? page,
      totalPages: data?.totalPages ?? 1,
      total: data?.total ?? 0,
      loading,
      search,
      myClassOnly,
      setPage,
      setSearch,
      setMyClassOnly,
    }),
    [data, page, loading, search, myClassOnly]
  );
}
