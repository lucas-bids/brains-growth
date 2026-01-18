import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brains Growth",
  description: "Brains Growth — Front-end application",
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
