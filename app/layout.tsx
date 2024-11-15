import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'
import ModelProvider from "@/components/model-provider";
import { Inter } from "next/font/google";
import ToasterProvider from "@/components/toaster-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mayank's GenAi",
  description: "Created By Mayank Kumar Prasad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={inter.className}
        >
          {<ToasterProvider />}
          {<ModelProvider />}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
