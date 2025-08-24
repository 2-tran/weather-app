"use client";

import { useCallback } from "react";
import { SearchHistory } from "../../types/search";
import { TIME_CONFIG } from "@/config/constants";

export function useSearchHistoryComponent(history: SearchHistory[]) {
  const formatTime = useCallback((timestamp: number) => {
    const now = Date.now();
    const diffInHours = Math.floor((now - timestamp) / TIME_CONFIG.MS_PER_HOUR);

    if (diffInHours < 1) return "Just now";
    if (diffInHours < TIME_CONFIG.HOURS_PER_DAY) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / TIME_CONFIG.HOURS_PER_DAY);
    return `${diffInDays}d ago`;
  }, []);

  return { history, formatTime };
}
