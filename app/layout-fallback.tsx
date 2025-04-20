import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Initialize Inter font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Love for BTS",
  description: "A community platform for BTS fans and ARMY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
} 