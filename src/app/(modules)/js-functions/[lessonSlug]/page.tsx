import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import JsFunctionsLessonClient from "./client";

interface Props {
  params: Promise<{ lessonSlug: string }>;
}

export async function generateStaticParams() {
  const mod = getModule("js-functions");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export default async function JsFunctionsLessonPage({ params }: Props) {
  const { lessonSlug } = await params;
  const lesson = getLesson("js-functions", lessonSlug);
  if (!lesson) notFound();
  return <JsFunctionsLessonClient lesson={lesson} lessonSlug={lessonSlug} />;
}
