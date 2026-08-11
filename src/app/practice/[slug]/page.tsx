import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPracticeQuestion, practiceQuestions } from "@/content/practice";
import { getPracticeLevel } from "@/types/practice";
import PracticeRunner from "@/components/practice/PracticeRunner";

export function generateStaticParams() {
  return practiceQuestions.map((question) => ({ slug: question.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const question = getPracticeQuestion(slug);
  if (!question) return { title: "Practice" };

  return {
    title: question.title,
    description: `${getPracticeLevel(question)} practice question — ${question.topics.join(", ")}.`,
  };
}

export default async function PracticeQuestionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const question = getPracticeQuestion(slug);

  if (!question) notFound();

  // key remounts the runner on navigation, which resets all per-question state.
  return <PracticeRunner key={question.id} question={question} />;
}
