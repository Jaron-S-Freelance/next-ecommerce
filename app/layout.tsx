import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./styles/globals.css";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fusion Design",
  description: "Where Styles Unite, Interiors Delight",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lora.className}>{children}</body>
    </html>
  );
}
