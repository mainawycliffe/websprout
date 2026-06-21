import type { Metadata } from "next";
import { getModule } from "@/content/modules";

const mod = getModule("react-nextjs-visualized")!;

export const metadata: Metadata = {
  title: mod.title,
  description: mod.description,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
