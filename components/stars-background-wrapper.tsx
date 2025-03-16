"use client";

import { StarsBackground } from "@/components/ui/stars-background";

interface StarsBackgroundWrapperProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
}

export default function StarsBackgroundWrapper({
  starDensity = 0.0002,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
}: StarsBackgroundWrapperProps) {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      <StarsBackground 
        starDensity={starDensity}
        allStarsTwinkle={allStarsTwinkle}
        twinkleProbability={twinkleProbability}
        minTwinkleSpeed={minTwinkleSpeed}
        maxTwinkleSpeed={maxTwinkleSpeed}
      />
    </div>
  );
} 