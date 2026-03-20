import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import WebAccessibilityLessonClient from "./client";

interface Props {
  params: Promise<{ lessonSlug: string }>;
}

export async function generateStaticParams() {
  const mod = getModule("web-accessibility");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export default async function WebAccessibilityLessonPage({ params }: Props) {
  const { lessonSlug } = await params;
  const lesson = getLesson("web-accessibility", lessonSlug);
  if (!lesson) notFound();
  return <WebAccessibilityLessonClient lesson={lesson} lessonSlug={lessonSlug} />;
}
