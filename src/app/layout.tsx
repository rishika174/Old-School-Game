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

          <Footer/>
        </main>
      {/*</StrictMode>*/}

      </body>
    </html>
    );
}

