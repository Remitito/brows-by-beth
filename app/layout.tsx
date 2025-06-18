import type { Metadata } from "next";
import "./globals.css";

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
      <body className={``}>{children}</body>
    </html>
  );
}
