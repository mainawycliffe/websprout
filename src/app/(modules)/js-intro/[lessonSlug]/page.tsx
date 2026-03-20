import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import JsIntroLessonClient from "./client";

interface Props {
  params: Promise<{ lessonSlug: string }>;
}

export async function generateStaticParams() {
  const mod = getModule("js-intro");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export default async function JsIntroLessonPage({ params }: Props) {
  const { lessonSlug } = await params;
  const lesson = getLesson("js-intro", lessonSlug);
  if (!lesson) notFound();
  return <JsIntroLessonClient lesson={lesson} lessonSlug={lessonSlug} />;
}
