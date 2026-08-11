import type { Metadata } from "next";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Practice",
  description:
    "Standalone quizzes and coding challenges with instant feedback, sorted by difficulty — drill what you have learned and earn XP as you go.",
};

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-full">
      <Header backHref="/" />
      <main className="flex-1">{children}</main>
    </div>
  );
}
