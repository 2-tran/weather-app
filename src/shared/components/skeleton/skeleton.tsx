import React, { forwardRef } from "react";
import styles from "./skeleton.module.css";

type SkeletonProps = {
  className?: string;
  style?: React.CSSProperties;
  radius?: "none" | "sm" | "md" | "lg" | "full";
  disabledAnimation?: boolean;
  circle?: boolean;
  ariaLabel?: string;
};

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      style,
      radius = "sm",
      disabledAnimation = false,
      circle = false,
      ariaLabel = "Loading…",
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-busy="true"
        aria-label={ariaLabel}
        className={[
          styles.skeleton,
          circle ? styles.circle : "",
          styles[`radius-${radius}`],
          disabledAnimation ? styles.noAnim : styles.anim,
          className || "",
        ]
          .join(" ")
          .trim()}
        style={style}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
