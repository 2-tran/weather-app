import { Suspense } from "react";
import HomeContent from "./home/home";

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
