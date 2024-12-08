import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Replay | Gallery ",
  icons: {
    icon: "/Logo.svg",
  },
};

export default function PublicGalleryLayout({
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
