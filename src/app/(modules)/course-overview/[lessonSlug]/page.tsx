import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import CourseOverviewLessonClient from "./client";

interface Props {
  params: Promise<{ lessonSlug: string }>;
}

export async function generateStaticParams() {
  const mod = getModule("course-overview");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export default async function CourseOverviewLessonPage({ params }: Props) {
  const { lessonSlug } = await params;
  const lesson = getLesson("course-overview", lessonSlug);
  if (!lesson) notFound();
  return <CourseOverviewLessonClient lesson={lesson} lessonSlug={lessonSlug} />;
}
