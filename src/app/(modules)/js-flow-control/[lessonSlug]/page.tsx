import { notFound } from "next/navigation";
import { getLesson, getModule } from "@/content/modules";
import JsFlowControlLessonClient from "./client";

interface Props {
  params: Promise<{ lessonSlug: string }>;
}

export async function generateStaticParams() {
  const mod = getModule("js-flow-control");
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export default async function JsFlowControlLessonPage({ params }: Props) {
  const { lessonSlug } = await params;
  const lesson = getLesson("js-flow-control", lessonSlug);
  if (!lesson) notFound();
  return <JsFlowControlLessonClient lesson={lesson} lessonSlug={lessonSlug} />;
}
