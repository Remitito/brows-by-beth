import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import WebNavbar from "./(components)/WebNavbar";
import MobileNavbar from "./(components)/MobileNavbar";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brows by Beth",
  description:
    "Fully Qualified and Insured Brow & Lash Stylist in Hereford and Presteigne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} h-screen bg-soft-pink w-screen`}>
        <nav className="fixed lg:flex hidden top-0 h-[10%] left-0 w-full z-50">
          <WebNavbar />
        </nav>
        <nav className="fixed lg:hidden flex top-0 h-[10%] left-0 w-screen z-50">
          <MobileNavbar />
        </nav>
        <div className="h-[100%] flex items-center justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
