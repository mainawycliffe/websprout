import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import TagBuilderLesson from "@/components/tag-builder/TagBuilderLesson";

interface Props {
  params: Promise<{ lessonSlug: string }>;
}

export async function generateStaticParams() {
  const mod = getModule("tag-builder");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export default async function TagBuilderLessonPage({ params }: Props) {
  const { lessonSlug } = await params;
  const lesson = getLesson("tag-builder", lessonSlug);

  if (!lesson) {
    notFound();
  }

  return <TagBuilderLesson lesson={lesson} />;
}
