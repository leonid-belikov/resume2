import type { Metadata } from "next";

// Static metadata is rendered into <head> at build time, which works with static export.
export const metadata: Metadata = {
  title: "Leonid Belikov",
  description: "Frontend developer portfolio.",
};

// Server Component by default: rendered to HTML at build time, no 'use client' needed.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
