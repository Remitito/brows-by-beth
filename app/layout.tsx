import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import WebNavbar from "@/components/WebNavbar";
import MobileNavbar from "@/components/MobileNavbar";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brows by Beth",
  description:
    "Fully Qualified and Insured Brow & Lash Stylist in Hereford and Presteigne",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} h-screen bg-soft-pink w-screen`}>
        <WebNavbar />
        <MobileNavbar />
        <div className="md:h-[90vh] flex items-center justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
