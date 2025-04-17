import Footer from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ThemeProvider } from "@/components/theme/theme-provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConvexClientProvider } from '@/app/ConvexClientProvider'
import { Toaster } from "@/components/ui/sonner";

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
  title: "Godfrey Okoye Postgraduate School",
  description:
    "Godfrey Okoye Postgraduate School is dedicated to academic excellence, research, and professional development. Our diverse range of postgraduate programs equips students with advanced knowledge and skills, fostering innovation and leadership in various fields.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          <ConvexClientProvider>
            <Nav />
            {children}
            <Footer />
            <Toaster />
            {/* <ChatWidget /> */}
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
