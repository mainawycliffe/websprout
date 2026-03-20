import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import JsDomLessonClient from "./client";

interface Props {
  params: Promise<{ lessonSlug: string }>;
}

export async function generateStaticParams() {
  const mod = getModule("js-dom");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export default async function JsDomLessonPage({ params }: Props) {
  const { lessonSlug } = await params;
  const lesson = getLesson("js-dom", lessonSlug);
  if (!lesson) notFound();
  return <JsDomLessonClient lesson={lesson} lessonSlug={lessonSlug} />;
}
