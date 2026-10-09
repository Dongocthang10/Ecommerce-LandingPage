import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import "./space-theme.css";

const font = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Winnify | Phones, laptops, tablets and audio",
  description: "Premium devices at honest prices, with free returns and a two-year warranty.",
};

// Dark (space) is the default; restore a saved light choice before first paint.
const themeInit = `try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.remove("dark")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head>
      <body className={`${font.className} antialiased`}>
        <div className="space-sky" />
        <div className="space-glow" />
        {children}
      </body>
    </html>
  );
}
