import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import MainNavbar from "@/components/navBar/main-navbar";
import { ShoppingCartProvider } from "@/components/cart/context/shopping-cart-context";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StyleShop",
  description: "La mejor tienda de ropa en línea",
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
        <ShoppingCartProvider>
          
          <MainNavbar />
          <main className="pt-20">{children}</main>
          <Toaster />
        </ShoppingCartProvider>
      </body>
    </html>
  );
}
