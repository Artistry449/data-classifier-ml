import type { Metadata } from "next";
import localFont from "next/font/local";
import { GiMongolia } from "react-icons/gi";
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <header className="flex justify-between max-w-4xl m-auto h-14 items-center p-8 ">
          <div>
            <GiMongolia size={60} />
            {/* <Image src={"https://www.vectorkhazana.com/assets/images/products/Super-Mario-Strikers.jpg"} alt="it's me mario" height={30} width={30}/> */}
            {/* <h1>Algo biy daalt 1</h1> */}
          </div>
          <div className=" font-bold">Хамтын хүч оломгүй далай</div>
        </header>
        {children}
        <footer className="flex justify-between max-w-4xl m-auto p-8 h-14">
          <div>
            <p>Powered by Students</p>
            <p className=" text-sm h-14">© 2024 - ШУТИС МХТС оюутнууд</p>
          </div>
          <div></div>
        </footer>
      </body>
    </html>
  );
}
