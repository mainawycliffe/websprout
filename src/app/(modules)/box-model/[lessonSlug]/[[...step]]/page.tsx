import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import BoxModelLesson from "@/components/box-model/BoxModelLesson";

interface Props {
  params: Promise<{ lessonSlug: string; step?: string[] }>;
}

export async function generateStaticParams() {
  const mod = getModule("box-model");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonSlug } = await params;
  const lesson = getLesson("box-model", lessonSlug);
  if (!lesson) return {};
  const mod = getModule("box-model")!;
  return { title: `${lesson.title} – ${mod.title}`, description: lesson.description };
}

export default async function BoxModelLessonPage({ params }: Props) {
  const { lessonSlug, step } = await params;
  const lesson = getLesson("box-model", lessonSlug);

  if (!lesson) {
    notFound();
  }

  const initialStep = step?.[0] ? parseInt(step[0], 10) || 0 : 0;

  return <BoxModelLesson moduleId="box-model" lesson={lesson} initialStep={initialStep} />;
}
