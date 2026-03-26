import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Wallpapers — Ryyan Safar",
  description: "COLLECTION_003 UNHINGED_GALLERY",
  icons: {
    icon: [
      { url: "/Logo-bg.svg", type: "image/svg+xml" },
    ],
    shortcut: "/Logo-bg.svg",
    apple: "/Logo-bg.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/Logo-bg.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/Logo-bg.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/Logo-bg.svg" type="image/svg+xml" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800;900&family=Epilogue:wght@300;400;500;600;700&family=Barrio&family=Council&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body text-on-surface select-none bg-surface">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
