import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Replay | About ",
  description: "About Replay",
  icons: {
    icon: "/Logo.svg",
  },
};

export default function AboutLayout({
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
