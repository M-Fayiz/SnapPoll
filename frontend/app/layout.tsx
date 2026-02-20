import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { Provider } from "react-redux";
import { store } from "@/store/auth.store";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SnapPoll",
  description: "Live polls and chat rooms with real-time results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
         <Provider store={store}>

             <body className={`${display.variable} ${body.variable} antialiased`}>{children}</body>
         </Provider>
    </html>
  );
}
