import localFont from "next/font/local";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";

export const clashDisplay = localFont({
  src: [
    { path: "./clash-display/ClashDisplay-200.woff2", weight: "200", style: "normal" },
    { path: "./clash-display/ClashDisplay-300.woff2", weight: "300", style: "normal" },
    { path: "./clash-display/ClashDisplay-400.woff2", weight: "400", style: "normal" },
    { path: "./clash-display/ClashDisplay-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = `${clashDisplay.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`;
