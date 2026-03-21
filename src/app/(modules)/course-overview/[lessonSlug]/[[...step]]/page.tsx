import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import CourseOverviewLessonClient from "../client";

interface Props {
  params: Promise<{ lessonSlug: string; step?: string[] }>;
}

export async function generateStaticParams() {
  const mod = getModule("course-overview");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonSlug } = await params;
  const lesson = getLesson("course-overview", lessonSlug);
  if (!lesson) return {};
  const mod = getModule("course-overview")!;
  return { title: `${lesson.title} – ${mod.title}`, description: lesson.description };
}

export default async function CourseOverviewLessonPage({ params }: Props) {
  const { lessonSlug, step } = await params;
  const lesson = getLesson("course-overview", lessonSlug);
  if (!lesson) notFound();
  const initialStep = step?.[0] ? parseInt(step[0], 10) || 0 : 0;
  return <CourseOverviewLessonClient lesson={lesson} lessonSlug={lessonSlug} initialStep={initialStep} />;
}
