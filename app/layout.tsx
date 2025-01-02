import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Formotech by Kafcode",
  description: "Plataforma de gerenciamento de estéticas automotivas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
