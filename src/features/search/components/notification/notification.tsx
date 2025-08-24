import { AlertCircle } from "lucide-react";
import styles from "./notification.module.css";

interface ErrorMessageProps {
  error: string;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorBox}>
        <AlertCircle className={styles.errorIcon} />
        <span>{error}</span>
      </div>
    </div>
  );
}
