import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Global styles

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "PawPrix | Custom Pet Portraits From Photo",
  description:
    "Turn your pet photo into a stunning custom portrait. Choose Renaissance, Royal, Watercolor or Modern styles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans scroll-smooth`}>
      <body
        className="antialiased text-zinc-900 bg-white selection:bg-zinc-900 selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
