import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import BoxModelLesson from "@/components/box-model/BoxModelLesson";

interface Props {
  params: Promise<{ lessonSlug: string }>;
}

export async function generateStaticParams() {
  const mod = getModule("box-model");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export default async function BoxModelLessonPage({ params }: Props) {
  const { lessonSlug } = await params;
  const lesson = getLesson("box-model", lessonSlug);

  if (!lesson) {
    notFound();
  }

  return <BoxModelLesson lesson={lesson} />;
}
