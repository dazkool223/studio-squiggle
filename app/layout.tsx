import type { Metadata } from "next";

import localFont from "next/font/local";
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
      <body className={`${chaloops.variable} antialiased`}>{children}</body>
    </html>
  );
}
