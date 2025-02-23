import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar";

import "./globals.css";
import { urbanist } from "./utils/font";
import ChatProvider from "@/context/chatsContext";

export const metadata: Metadata = {
  title: "Gemini Clone",
  description:
    "A clone of Google's Gemini AI assistant interface built with Next.js and tailwind css.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`antialiased ${urbanist.className}`}
      >
        <ChatProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ChatProvider>
      </body>
    </html>
  );
}
