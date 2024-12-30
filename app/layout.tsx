import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ReactQueryProvider } from "@/providers/reactQueryProvider";
import { DM_Sans } from 'next/font/google'

import { Toaster } from "sonner";
const font=DM_Sans({
  subsets:["latin"],
  weight:["400","700"],
})  

export const metadata: Metadata = {
  title: "loom",
  description: "loom is a video sharing platform that allows you to share videos with your prospects",
  icons: {
    icon: "/logo.svg",
  },
};

type NewType = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: Readonly<NewType>) {
  return (
        <ClerkProvider>
    <html lang="en">
      <body className={`antialiased ${font.className}`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ReactQueryProvider>
              <Toaster/>
              {children}
            </ReactQueryProvider>
          </ThemeProvider>
      </body>
    </html>
        </ClerkProvider>
  );
}