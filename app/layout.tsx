import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context/AppContext";
import { Header } from "@/components/layout/Header";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GetSetAI Training Platform",
  description: "AI-powered compliance training and course generation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <AppProvider>
          <div className="min-h-screen bg-gray-900">
            <Header />
            <main>{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
