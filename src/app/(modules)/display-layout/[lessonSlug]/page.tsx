import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import DisplayLayoutLesson from "@/components/display-layout/DisplayLayoutLesson";

interface Props {
  params: Promise<{ lessonSlug: string }>;
}

export async function generateStaticParams() {
  const mod = getModule("display-layout");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export default async function DisplayLayoutLessonPage({ params }: Props) {
  const { lessonSlug } = await params;
  const lesson = getLesson("display-layout", lessonSlug);

  if (!lesson) {
    notFound();
  }

  return <DisplayLayoutLesson lesson={lesson} />;
}
