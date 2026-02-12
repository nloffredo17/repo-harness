import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Repo Harness App",
  description: "Agent-ready Next.js app from Repo Harness Starter Kit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
