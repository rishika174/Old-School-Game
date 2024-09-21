import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from 'react';
// import {StrictMode} from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  title: "Old School Game",
  description: "Unlock Your Mind's Potential",
  openGraph:{
    type: "website",
    url: "https://oldschoolgame.vercel.app/",
    title: "Old School Game",
    description: "Unlock Your Mind's Potential",
    siteName: "Old School Game",
    images: [{   url: "/oldschoolgame.webp",   }],
  },
  twitter:{
    card: "summary_large_image",
    site: "https://oldschoolgame.vercel.app/",
    creator: "Old School Game",
    description:"Unlock Your Mind's Potential",
    images: "/oldschoolgame.webp"
  }

};

export default function RootLayout( {
  children,
}: Readonly <{
  children: React.ReactNode;
}> ) {

  console.log("Reloaded Layout Page...")

    return (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable}`}>

    {/*<StrictMode>*/}
    <main>


      <Navbar/>

      {children}
      <div className="paperOverlay"></div>

      <Footer/>
    </main>
    {/*</StrictMode>*/}

    </body>
    </html>
    );
}

