import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Replay | Login ",
  description: " Login to Replay ",
  icons: {
    icon: "/Logo.svg",
  },
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main lang="en">
      <div>{children}</div>
    </main>
  );
}
