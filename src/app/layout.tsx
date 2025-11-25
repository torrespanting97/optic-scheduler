import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpticHome | Professional Eye Exams at Your Doorstep",
  description: "Professional eye examinations and custom eyewear fitting in the comfort of your home. Browse our catalog and schedule your appointment today.",
  keywords: ["eye exam", "optical", "glasses", "home service", "eyewear", "prescription glasses"],
  openGraph: {
    title: "OpticHome - Home Eye Exams & Custom Eyewear",
    description: "Professional eye examinations and custom eyewear fitting at your home.",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
