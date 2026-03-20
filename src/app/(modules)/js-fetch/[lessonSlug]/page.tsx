import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import JsFetchLessonClient from "./client";

interface Props {
  params: Promise<{ lessonSlug: string }>;
}

export async function generateStaticParams() {
  const mod = getModule("js-fetch");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export default async function JsFetchLessonPage({ params }: Props) {
  const { lessonSlug } = await params;
  const lesson = getLesson("js-fetch", lessonSlug);
  if (!lesson) notFound();
  return <JsFetchLessonClient lesson={lesson} lessonSlug={lessonSlug} />;
}
