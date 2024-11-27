import type { Metadata } from "next";
import localFont from "next/font/local";
import { GiMongolia } from "react-icons/gi";
import Header from "./_components/partails/header";
import Footer from "./_components/partails/footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Алдаа засагч",
  description: "Created by team1",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white h-full`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
