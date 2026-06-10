import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import ModernJsLessonClient from "../client";

interface Props {
  params: Promise<{ lessonSlug: string; step?: string[] }>;
}

export async function generateStaticParams() {
  const mod = getModule("modern-js");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonSlug } = await params;
  const lesson = getLesson("modern-js", lessonSlug);
  if (!lesson) return {};
  const mod = getModule("modern-js")!;
  return { title: `${lesson.title} – ${mod.title}`, description: lesson.description };
}

export default async function ModernJsLessonPage({ params }: Props) {
  const { lessonSlug, step } = await params;
  const lesson = getLesson("modern-js", lessonSlug);
  if (!lesson) notFound();
  const initialStep = step?.[0] ? parseInt(step[0], 10) || 0 : 0;
  return <ModernJsLessonClient lesson={lesson} lessonSlug={lessonSlug} initialStep={initialStep} />;
}
