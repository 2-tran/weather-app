"use client";

import React from "react";
import { SearchHistory } from "../../types/search";
import { Clock, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/button/button";
import styles from "./search-history.module.css";
import { useSearchHistoryComponent } from "./use-search-history";
import RenderWhen from "@/shared/components/render-when/render-when";

interface SearchHistoryProps {
  history: SearchHistory[];
  onSelectCity: (city: string) => void;
  onClearHistory: () => void;
}

export function SearchHistoryComponent({
  history,
  onSelectCity,
  onClearHistory,
}: SearchHistoryProps) {
  const { formatTime } = useSearchHistoryComponent(history);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Clock className={styles.iconMd} />
          Recent Searches
        </h3>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            className={styles.clearButton}
          >
            <Trash2 className={styles.iconSm} />
          </Button>
        )}
      </div>

      <div className={styles.list}>
        <RenderWhen>
          <RenderWhen.If isTrue={history.length > 0}>
            {history.map((item) => (
              <button
                key={`${item.city}-${item.timestamp}`}
                onClick={() => onSelectCity(item.city)}
                className={styles.item}
              >
                <div className={styles.boxCity}>
                  <div className={styles.city}>
                    {item.city}, {item.country}
                  </div>
                  <div className={styles.time}>
                    {formatTime(item.timestamp)}
                  </div>
                </div>
                <div className={styles.arrow}>
                  <svg
                    className={styles.iconSm}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </RenderWhen.If>
          <RenderWhen.Else>
            <div className={styles.noData}>
              <p>No recent searches</p>
            </div>
          </RenderWhen.Else>
        </RenderWhen>
      </div>
    </div>
  );
}
