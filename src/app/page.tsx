'use client';

import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import { modules, getPrerequisiteModules } from '@/content/modules';
import PrerequisitesList from '@/components/ui/PrerequisitesList';
import { useIndexedDB } from '@/hooks/useIndexedDB';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const { isReady, getModuleProgress } = useIndexedDB();
  const [moduleProgress, setModuleProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!isReady) return;
    Promise.all(
      modules.map(async (mod) => {
        const progress = await getModuleProgress(mod.id);
        const totalSteps = mod.lessons.reduce((sum, l) => sum + l.steps.length, 0);
        const completedSteps = progress.reduce((sum, p) => sum + p.completedSteps.length, 0);
        return { id: mod.id, progress: totalSteps > 0 ? completedSteps / totalSteps : 0 };
      }),
    ).then((results) => {
      const map: Record<string, number> = {};
      results.forEach((r) => (map[r.id] = r.progress));
      setModuleProgress(map);
    });
  }, [isReady, getModuleProgress]);

  return (
    <div className='flex flex-col min-h-full'>
      <Header />
      <main className='flex-1 max-w-7xl mx-auto w-full px-4 py-12'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-12'>
          <h1 className='text-4xl font-bold bg-linear-to-r from-(--color-gradient-start) to-(--color-gradient-end) bg-clip-text text-transparent mb-3'>
            Learn HTML, CSS and Javascript
          </h1>
          <p className='text-lg text-text-muted mx-auto'>
            Interactive exercises to help you understand how web pages work. No experience needed — start from zero!
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {modules.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}>
              <Link href={`/${mod.slug}`}>
                <Card hoverable className='h-full border-2 border-transparent hover:border-primary/30'>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-start justify-between'>
                      <span className='text-4xl'>{mod.icon}</span>
                      <span
                        className='text-xs font-semibold px-2 py-1 rounded-full text-white'
                        style={{ backgroundColor: mod.color }}>
                        {mod.lessons.length} lessons
                      </span>
                    </div>
                    <div>
                      <h2 className='text-xl font-bold text-text mb-1'>{mod.title}</h2>
                      <p className='text-sm text-text-muted leading-relaxed'>{mod.description}</p>
                    </div>
                    <PrerequisitesList prerequisites={getPrerequisiteModules(mod)} />
                    <ProgressIndicator progress={moduleProgress[mod.id] ?? 0} color={mod.color} showLabel />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
