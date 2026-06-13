import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";

const chaloops = localFont({
  src: [
    { path: "../public/fonts/chaloops/Chaloops-Regular.woff2", weight: "400" },
    { path: "../public/fonts/chaloops/Chaloops-Medium.woff2", weight: "500" },
    { path: "../public/fonts/chaloops/Chaloops-Bold.woff2", weight: "700" },
  ],
  variable: "--font-chaloops",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio.Squiggle — For the weird, by the weird",
  description:
    "We help brands embrace their own kind of weird. Carefully built identities, illustrated with intention.",
  icons: { icon: "/logo.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${chaloops.variable} ${poppins.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
