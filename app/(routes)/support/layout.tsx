import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Us | Love for BTS",
  description: "Support our ARMY community to help us maintain and improve this space where we all celebrate our love for BTS.",
  keywords: "BTS, ARMY, support, donate, Ko-fi, community, fan site",
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 