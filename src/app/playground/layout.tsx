import type { Metadata } from "next";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "JS/TS Playground",
  description:
    "Write and run JavaScript or TypeScript directly in the browser with instant feedback and inline linting.",
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
    </div>
  );
}
