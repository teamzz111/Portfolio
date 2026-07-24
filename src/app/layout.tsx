import type { Metadata } from "next";
import { fontVariables } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andrés Largo — FullStack Developer",
  description: "FullStack developer in search of beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
