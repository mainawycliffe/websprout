import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import DisplayLayoutLesson from "@/components/display-layout/DisplayLayoutLesson";

interface Props {
  params: Promise<{ lessonSlug: string; step?: string[] }>;
}

export async function generateStaticParams() {
  const mod = getModule("display-layout");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonSlug } = await params;
  const lesson = getLesson("display-layout", lessonSlug);
  if (!lesson) return {};
  const mod = getModule("display-layout")!;
  return { title: `${lesson.title} – ${mod.title}`, description: lesson.description };
}

export default async function DisplayLayoutLessonPage({ params }: Props) {
  const { lessonSlug, step } = await params;
  const lesson = getLesson("display-layout", lessonSlug);

  if (!lesson) {
    notFound();
  }

  const initialStep = step?.[0] ? parseInt(step[0], 10) || 0 : 0;

  return <DisplayLayoutLesson moduleId="display-layout" lesson={lesson} initialStep={initialStep} />;
}
