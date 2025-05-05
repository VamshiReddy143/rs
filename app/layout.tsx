

import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import SessionWrapper from "@/components/SessionWrapper";
import NavbarWrapper from "@/components/NavbarWrapper";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', "200", "700", "500", "300"],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Rootstrap Clients",
  description: "Client reviews and review submission platform",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${interFont.variable} ${poppins.variable} antialiased bg-[#1a1a1a] text-white`}>
        <SessionWrapper>
          <div className="text-white lg:max-w-[90em] lg:px-[6em] lg:mx-auto px-3">
            <NavbarWrapper />
          </div>
          <main>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </main>
        </SessionWrapper>
      </body>
    </html>
  );
}