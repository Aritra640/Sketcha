import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Sketcha",
  description: "Sketcha app --draw and collab with others",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
