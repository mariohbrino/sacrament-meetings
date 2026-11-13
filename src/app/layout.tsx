import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { ThemeProvider } from "@/providers/theme.provider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  // DM Mono is not a variable font, so weights must be listed explicitly
  weight: ["300", "400", "500"],
});

const wardName: string = "Garden Park 1st";

export const metadata: Metadata = {
  title: `${wardName} | Sacrament Meeting`,
  description: "Schedule and details for sacrament meetings",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${dmMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header wardName={wardName} />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
