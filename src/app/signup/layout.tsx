import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Replay | Signup ",
  description: " Signup to Replay ",
  icons: {
    icon: "/Logo.svg",
  },
};

export default function SignupLayout({
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
