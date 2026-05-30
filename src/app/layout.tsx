import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "LearnFlow — Student Dashboard",
  description: "Next-gen learning dashboard with live course tracking",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="h-full bg-[#0a0a0f] text-slate-200 font-[var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
