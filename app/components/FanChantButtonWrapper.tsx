"use client";

import dynamic from 'next/dynamic';

// Dynamically import the client component with no SSR to avoid hydration issues with Audio
const ClientFanChantButton = dynamic(
  () => import('./ClientFanChantButton').then(mod => ({ default: mod.ClientFanChantButton })),
  { ssr: false }
);

export function FanChantButtonWrapper() {
  return <ClientFanChantButton />;
} 
