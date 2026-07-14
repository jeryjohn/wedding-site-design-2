import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anish & Anju — Betrothal Invitation",
  description: "You are cordially invited to the Betrothal ceremony of Anju & Anish",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Anish & Anju — Betrothal Invitation",
    description: "You are cordially invited to the Betrothal ceremony of Anju & Anish",
    url: "https://betrothalof-anish-and-anju.vercel.app",
    siteName: "Anish & Anju Betrothal Invitation",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 1200,
        alt: "Anish & Anju Betrothal Invitation Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Mrs+Saint+Delafield&family=Jost:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-eb">
        {children}
      </body>
    </html>
  );
}
