import type { Metadata } from "next";
// import { Poppins, Darker_Grotesque } from '@next/font/google';
import { Poppins, Darker_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-darker-grotesque",
});



export const metadata: Metadata = {
  title: "Replay | Homepage ",
  description: "Save your images and share with your love ones ",
  icons: {
    icon: "/Logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${darkerGrotesque.variable} text-black antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
