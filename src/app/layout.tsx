import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andrés Largo — FullStack Developer",
  description: "FullStack developer in search of beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
