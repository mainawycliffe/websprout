import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import FormsLessonClient from "./client";

interface Props {
  params: Promise<{ lessonSlug: string }>;
}

export async function generateStaticParams() {
  const mod = getModule("forms");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export default async function FormsLessonPage({ params }: Props) {
  const { lessonSlug } = await params;
  const lesson = getLesson("forms", lessonSlug);
  if (!lesson) notFound();
  return <FormsLessonClient lesson={lesson} lessonSlug={lessonSlug} />;
}
