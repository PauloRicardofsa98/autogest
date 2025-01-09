import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "AutoGest by Paulo Ricardo",
  description: "Plataforma de gerenciamento de estéticas automotivas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`antialiased`}>
        <ClerkProvider localization={ptBR}>
          {children}
          <ToastContainer position="top-center" />
        </ClerkProvider>
      </body>
    </html>
  );
}
