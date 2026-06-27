import type { Metadata } from "next";
import { Fredoka, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { MascotProvider } from "@/lib/mascot-context";

const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "AI/ML Engineer — Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MascotProvider>{children}</MascotProvider>
      </body>
    </html>
  );
}
