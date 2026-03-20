import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import JsDataTypesLessonClient from "./client";

interface Props {
  params: Promise<{ lessonSlug: string }>;
}

export async function generateStaticParams() {
  const mod = getModule("js-data-types");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export default async function JsDataTypesLessonPage({ params }: Props) {
  const { lessonSlug } = await params;
  const lesson = getLesson("js-data-types", lessonSlug);
  if (!lesson) notFound();
  return <JsDataTypesLessonClient lesson={lesson} lessonSlug={lessonSlug} />;
}
