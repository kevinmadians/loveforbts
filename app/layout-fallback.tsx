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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-white`}>
        <main className="flex-1 flex justify-center">
          <div className="w-full max-w-6xl mx-auto px-4">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
} 
