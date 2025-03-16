"use client";

import dynamic from 'next/dynamic';

const SplashCursor = dynamic(() => import('@/components/ui/splash-cursor'), { ssr: false });

export default function SplashCursorWrapper(props: any) {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <SplashCursor 
        BACK_COLOR={props.BACK_COLOR || { r: 0, g: 0, b: 0 }}
        TRANSPARENT={props.TRANSPARENT !== undefined ? props.TRANSPARENT : true}
        DENSITY_DISSIPATION={props.DENSITY_DISSIPATION || 2.5}
        VELOCITY_DISSIPATION={props.VELOCITY_DISSIPATION || 1.5}
        SPLAT_RADIUS={props.SPLAT_RADIUS || 0.3}
        CURL={props.CURL || 20}
        COLOR_UPDATE_SPEED={props.COLOR_UPDATE_SPEED || 6}
      />
    </div>
  );
} 