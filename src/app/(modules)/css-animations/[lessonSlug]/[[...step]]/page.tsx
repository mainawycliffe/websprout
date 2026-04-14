import { getLesson, getModule } from '@/content/modules';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CssAnimationsLessonClient from '../client';

interface Props {
  params: Promise<{ lessonSlug: string; step?: string[] }>;
}

export async function generateStaticParams() {
  const mod = getModule('css-animations');
  if (!mod) return [];
  return mod.lessons.map((lesson) => ({ lessonSlug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonSlug } = await params;
  const lesson = getLesson('css-animations', lessonSlug);
  if (!lesson) return {};
  const mod = getModule('css-animations')!;
  return { title: `${lesson.title} – ${mod.title}`, description: lesson.description };
}

export default async function CssAnimationsLessonPage({ params }: Props) {
  const { lessonSlug, step } = await params;
  const lesson = getLesson('css-animations', lessonSlug);
  if (!lesson) notFound();
  const initialStep = step?.[0] ? parseInt(step[0], 10) || 0 : 0;
  return <CssAnimationsLessonClient lesson={lesson} lessonSlug={lessonSlug} initialStep={initialStep} />;
}
