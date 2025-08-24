"use client";

import { useState, useEffect, useCallback } from "react";
import { SearchHistory } from "../types/search";
import { StorageService } from "../services/storage";

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistory[]>([]);

  useEffect(() => {
    const savedHistory = StorageService.getSearchHistory();
    setHistory(savedHistory);
  }, []);

  const addToHistory = useCallback((city: string, country: string) => {
    StorageService.addToSearchHistory(city, country);
    const updatedHistory = StorageService.getSearchHistory();
    setHistory(updatedHistory);
  }, []);

  const clearHistory = useCallback(() => {
    StorageService.clearSearchHistory();
    setHistory([]);
  }, []);

  return {
    history,
    addToHistory,
    clearHistory,
  };
}
