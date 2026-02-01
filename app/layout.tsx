import type { Metadata } from "next";

import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";

const chaloops = localFont({
  src: [
    {
      path: "../public/fonts/chaloops/Chaloops-Regular.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/chaloops/Chaloops-Medium.woff2",
      weight: "500",
    },
    {
      path: "../public/fonts/chaloops/Chaloops-Bold.woff2",
      weight: "700",
    },
    {
      path: "../public/fonts/chaloops/Chaloops-Regular.woff",
      weight: "400",
    },
    {
      path: "../public/fonts/chaloops/Chaloops-Medium.woff",
      weight: "500",
    },
    {
      path: "../public/fonts/chaloops/Chaloops-Bold.woff",
      weight: "700",
    },
  ],
  variable: "--font-chaloops",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap", // Ensures text is visible while the font loads
  variable: "--font-poppins", // Optional: for using with CSS variables or Tailwind
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Specify all desired weights
});

export const metadata: Metadata = {
  title: "Studio Squiggle",
  description: "For the weird - By the weird",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${chaloops.variable} ${poppins.variable} antialiased sm:overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
