"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/shared/components/input/input";
import { Button } from "@/shared/components/button/button";
import styles from "./search-bar.module.css";
import { useSearchBar } from "./use-search-bar";

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading?: boolean;
  error?: string | null;
}

export function SearchBar({ onSearch, loading = false }: SearchBarProps) {
  const {
    city,
    inputRef,
    inputError,
    handleSearch,
    handleKeyPress,
    handleInputChange,
  } = useSearchBar(onSearch);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.inputWrapper}>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className={styles.inputPadding}
            error={inputError}
          />
        </div>
        <Button
          onClick={handleSearch}
          loading={loading}
          hasIconLoading={false}
          disabled={!city.trim() || loading}
          className={styles.shrink}
        >
          <Search className={styles.icon} />
        </Button>
      </div>
    </div>
  );
}
