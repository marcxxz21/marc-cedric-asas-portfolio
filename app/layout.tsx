import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marc Cedric Asas | Data Engineer and AI Portfolio",
  description:
    "Portfolio template for Marc Cedric Asas, an applied physics student and aspiring data engineer focused on practical software, data pipelines, and intelligent systems.",
  metadataBase: new URL("https://marc-cedric-asas.vercel.app"),
  icons: {
    icon: [
      {
        url: "/favicon.jpg",
        type: "image/jpeg"
      }
    ],
    apple: [
      {
        url: "/favicon.jpg",
        type: "image/jpeg"
      }
    ]
  },
  openGraph: {
    title: "Marc Cedric Asas | Data Engineer and AI Portfolio",
    description:
      "Applied physics, data engineering, AI systems, and practical software projects.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
