import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import ResponsiveDesignLessonClient from "./client";

interface Props {
  params: Promise<{ lessonSlug: string }>;
}

export async function generateStaticParams() {
  const mod = getModule("responsive-design");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export default async function ResponsiveDesignLessonPage({ params }: Props) {
  const { lessonSlug } = await params;
  const lesson = getLesson("responsive-design", lessonSlug);
  if (!lesson) notFound();
  return <ResponsiveDesignLessonClient lesson={lesson} lessonSlug={lessonSlug} />;
}
