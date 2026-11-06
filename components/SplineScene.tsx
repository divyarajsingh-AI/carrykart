
"use client";

import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export default function SplineScene({
  scene,
  className,
}: SplineSceneProps) {
  return (
    <div className={className}>
      <Suspense
        fallback={
          <div className="flex h-full min-h-[320px] w-full items-center justify-center">
            <span className="text-sm text-violet-300/60">
              Loading 3D experience...
            </span>
          </div>
        }
      >
        <Spline scene={scene} />
      </Suspense>
    </div>
  );
}
