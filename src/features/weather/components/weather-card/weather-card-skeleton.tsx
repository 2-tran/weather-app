import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/card/card";
import { Skeleton } from "@/shared/components";
import styles from "./weather-card.module.css";

export function WeatherCardSkeleton() {
  return (
    <Card className={styles.card}>
      <CardHeader className={styles.header}>
        <CardTitle className={styles.title}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Skeleton style={{ width: 180, height: 20 }} />
          </div>
        </CardTitle>
        <div className={styles.headerRow}>
          <Skeleton style={{ width: 30, height: 25 }} />
          <Skeleton style={{ width: 100, height: 25 }} />
        </div>
      </CardHeader>
      <CardContent className={styles.content}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton style={{ width: 50, height: 50 }} radius="md" />
        </div>
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.detailBox}>
              <Skeleton
                className={styles.itemSkeletonLeft}
                style={{ width: 30, height: 25 }}
              />
              <Skeleton
                className={styles.itemSkeletonRight}
                style={{ width: 100, height: 25 }}
              />
            </div>
          ))}
        </div>
        <div className={styles.buttonWrapper}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Skeleton style={{ width: 180, height: 25 }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
