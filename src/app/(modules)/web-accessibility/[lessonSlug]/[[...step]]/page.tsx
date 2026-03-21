import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import WebAccessibilityLessonClient from "../client";

interface Props {
  params: Promise<{ lessonSlug: string; step?: string[] }>;
}

export async function generateStaticParams() {
  const mod = getModule("web-accessibility");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonSlug } = await params;
  const lesson = getLesson("web-accessibility", lessonSlug);
  if (!lesson) return {};
  const mod = getModule("web-accessibility")!;
  return { title: `${lesson.title} – ${mod.title}`, description: lesson.description };
}

export default async function WebAccessibilityLessonPage({ params }: Props) {
  const { lessonSlug, step } = await params;
  const lesson = getLesson("web-accessibility", lessonSlug);
  if (!lesson) notFound();
  const initialStep = step?.[0] ? parseInt(step[0], 10) || 0 : 0;
  return <WebAccessibilityLessonClient lesson={lesson} lessonSlug={lessonSlug} initialStep={initialStep} />;
}
