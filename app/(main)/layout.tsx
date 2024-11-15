import Footer from "@/components/general/footer";
import Navigation from "@/components/general/navigation";
import GlobalAudioController from "@/components/ui/audioPlayer";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Providers from "../providers";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Idol Manager",
  description: "Manage your favorite idols",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <Navigation />
        <Providers>{children}</Providers>
        <GlobalAudioController />
        <Footer />
      </body>
    </html>
  );
}
