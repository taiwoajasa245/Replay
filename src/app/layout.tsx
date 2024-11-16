import type { Metadata } from "next";

// for testing purpose 
// import { Poppins, Darker_Grotesque } from '@next/font/google';

import { Poppins, Darker_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <Providers>
          {children}
          <ToastContainer position="top-center" autoClose={2000} pauseOnHover />
        </Providers>
      </body>
    </html>
  );
}
