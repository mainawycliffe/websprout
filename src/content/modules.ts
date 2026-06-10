import type { Module } from '@/types/lesson';
import { boxModelLessons } from './box-model';
import { courseOverviewLessons } from './course-overview';
import { cssAnimationsLessons } from './css-animations';
import { cssBackgroundsLessons } from './css-backgrounds';
import { cssPositioningLessons } from './css-positioning';
import { displayLayoutLessons } from './display-layout';
import { formsLessons } from './forms';
import { jsDataTypesLessons } from './js-data-types';
import { jsDomLessons } from './js-dom';
import { jsFetchLessons } from './js-fetch';
import { jsFlowControlLessons } from './js-flow-control';
import { jsFunctionsLessons } from './js-functions';
import { jsIntegrationLessons } from './js-integration';
import { jsIntroLessons } from './js-intro';
import { jsPracticeTsLessons } from './js-practice-ts';
import { modernJsLessons } from './modern-js';
import { nextjsBeginnersLessons } from './nextjs-beginners';
import { reactFundamentalsLessons } from './react-fundamentals';
import { responsiveDesignLessons } from './responsive-design';
import { tagBuilderLessons } from './tag-builder';
import { webAccessibilityLessons } from './web-accessibility';

export const modules: Module[] = [
  {
    id: 'course-overview',
    title: 'Course Overview',
    description:
      'Understand what the web is and how it works — HTML, CSS, JavaScript, browsers, servers, and the journey of a web page.',
    slug: 'course-overview',
    icon: '\u{1F310}',
    color: '#06B6D4',
    lessons: courseOverviewLessons,
  },
  {
    id: 'tag-builder',
    title: 'Tag Builder',
    description:
      'Learn how HTML & CSS work from the ground up. Build tags, nest elements, and write your first styles.',
    slug: 'tag-builder',
    icon: '\u{1F4E6}',
    color: '#3B82F6',
    lessons: tagBuilderLessons,
    prerequisites: ['course-overview'],
  },
  {
    id: 'box-model',
    title: 'Box Model Explorer',
    description: 'See the CSS box model in 3D. Understand how content, padding, border, and margin work together.',
    slug: 'box-model',
    icon: '\u{1F4D0}',
    color: '#8B5CF6',
    lessons: boxModelLessons,
    prerequisites: ['tag-builder'],
  },
  {
    id: 'display-layout',
    title: 'Display & Layout',
    description:
      'Learn how the browser arranges elements. Master block, inline, flexbox, and CSS grid to build real page layouts.',
    slug: 'display-layout',
    icon: '\u{1F9E9}',
    color: '#EC4899',
    lessons: displayLayoutLessons,
    prerequisites: ['tag-builder', 'box-model'],
  },
  {
    id: 'responsive-design',
    title: 'Responsive Web Design',
    description:
      'Make websites adapt to any screen size. Master media queries, fluid typography, and mobile-first design.',
    slug: 'responsive-design',
    icon: '\u{1F4F1}',
    color: '#F59E0B',
    lessons: responsiveDesignLessons,
    prerequisites: ['display-layout'],
  },
  {
    id: 'css-animations',
    title: 'CSS Animations',
    description:
      'Learn purposeful motion from hover polish to keyframes, performance, and reduced-motion accessibility.',
    slug: 'css-animations',
    icon: '✨',
    color: '#A78BFA',
    lessons: cssAnimationsLessons,
    prerequisites: ['display-layout', 'responsive-design'],
  },
  {
    id: 'css-backgrounds',
    title: 'Backgrounds & Gradients',
    description:
      'Paint behind your content. Learn background-image, gradients, sizing, positioning, and the layered overlays that power every modern hero section.',
    slug: 'css-backgrounds',
    icon: '\u{1F5BC}️',
    color: '#0EA5E9',
    lessons: cssBackgroundsLessons,
    prerequisites: ['tag-builder', 'box-model'],
  },
  {
    id: 'css-positioning',
    title: 'Positioning & Layers',
    description:
      'Escape normal flow. Learn position: relative/absolute/fixed/sticky, z-index, stacking contexts, and pseudo-element tooltips — the toolkit behind modals, dropdowns, and sticky headers.',
    slug: 'css-positioning',
    icon: '\u{1F4D1}',
    color: '#D946EF',
    lessons: cssPositioningLessons,
    prerequisites: ['display-layout'],
  },
  {
    id: 'web-accessibility',
    title: 'Web Accessibility (A11y)',
    description:
      'Learn how to make websites accessible to all users. Master semantic HTML, ARIA attributes, keyboard navigation, color contrast, and accessibility testing.',
    slug: 'web-accessibility',
    icon: '\u267F',
    color: '#10B981',
    lessons: webAccessibilityLessons,
    prerequisites: ['tag-builder'],
  },
  {
    id: 'forms',
    title: 'HTML Forms',
    description:
      'Master HTML forms from the ground up. Build text inputs, dropdowns, checkboxes, radio buttons, and learn validation, styling, accessibility, and HTTP methods.',
    slug: 'forms',
    icon: '\u{1F4DD}',
    color: '#F43F5E',
    lessons: formsLessons,
    prerequisites: ['tag-builder'],
  },
  {
    id: 'js-intro',
    title: 'JS Playground',
    description:
      'Discover what JavaScript is and write your first lines of code. Learn variables, constants, and the browser console.',
    slug: 'js-intro',
    icon: '\u26A1',
    color: '#F59E0B',
    lessons: jsIntroLessons,
    prerequisites: ['course-overview'],
  },
  {
    id: 'js-data-types',
    title: 'Data Explorer',
    description:
      'Master JavaScript data types, arrays, and objects. Learn strings, numbers, booleans, and how to organize data into collections.',
    slug: 'js-data-types',
    icon: '\u{1F4CA}',
    color: '#3B82F6',
    lessons: jsDataTypesLessons,
    prerequisites: ['js-intro'],
  },
  {
    id: 'js-flow-control',
    title: 'Flow Control',
    description:
      'Make your programs smart with decisions and loops. Master if/else, switch, for loops, and the ternary operator.',
    slug: 'js-flow-control',
    icon: '\u{1F500}',
    color: '#8B5CF6',
    lessons: jsFlowControlLessons,
    prerequisites: ['js-data-types'],
  },
  {
    id: 'js-functions',
    title: 'Function Factory',
    description:
      'Write reusable code with functions. Learn declarations, arrow functions, scope, hoisting, and callbacks.',
    slug: 'js-functions',
    icon: '\u{2699}\uFE0F',
    color: '#EC4899',
    lessons: jsFunctionsLessons,
    prerequisites: ['js-flow-control'],
  },
  {
    id: 'js-practice-ts',
    title: 'JS Drills & TypeScript',
    description:
      'Sharpen your JavaScript with quickfire drills, untangle the famous quirks (== vs ===, hoisting, this, NaN), then graduate to TypeScript: types, interfaces, narrowing, and generics that make your code self-documenting.',
    slug: 'js-practice-ts',
    icon: '\u{1F6E0}️',
    color: '#7C3AED',
    lessons: jsPracticeTsLessons,
    prerequisites: ['js-functions'],
  },
  {
    id: 'js-dom',
    title: 'DOM Connector',
    description:
      'Connect JavaScript to the browser. Select elements, respond to events, and build interactive web pages.',
    slug: 'js-dom',
    icon: '\u{1F50C}',
    color: '#10B981',
    lessons: jsDomLessons,
    prerequisites: ['js-functions', 'tag-builder'],
  },
  {
    id: 'js-fetch',
    title: 'Data Fetching',
    description:
      'Master the Fetch API, Promises, async/await, and JSON. Learn to request data from servers, handle errors, and display live data in the browser.',
    slug: 'js-fetch',
    icon: '\u{1F4E1}',
    color: '#06B6D4',
    lessons: jsFetchLessons,
    prerequisites: ['js-dom'],
  },
  {
    id: 'js-integration',
    title: 'JS + HTML/CSS Integration',
    description:
      'Practice real interactive features: theme toggles, modals, accordions, tab switchers, validators, carousels, and a Sukuma price calculator. JS that mutates HTML and toggles CSS classes.',
    slug: 'js-integration',
    icon: '\u{1F517}',
    color: '#14B8A6',
    lessons: jsIntegrationLessons,
    prerequisites: ['js-dom', 'tag-builder'],
  },
  {
    id: 'modern-js',
    title: 'Modern JavaScript',
    description:
      'The modern JavaScript you actually use in React and production code — spread & rest, default parameters, object shorthand, the array-method toolkit (map/filter/reduce), safe data access, and async patterns. The bridge from vanilla JS to frameworks.',
    slug: 'modern-js',
    icon: '🚀',
    color: '#EAB308',
    lessons: modernJsLessons,
    prerequisites: ['js-data-types', 'js-functions'],
  },
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    description:
      'Learn React from scratch — components, JSX, props, state, and effects — building live, interactive UIs right in your browser. The library behind Facebook, Instagram, and most modern web apps.',
    slug: 'react-fundamentals',
    icon: '⚛️',
    color: '#61DAFB',
    lessons: reactFundamentalsLessons,
    prerequisites: ['modern-js', 'js-functions', 'js-dom'],
  },
  {
    id: 'nextjs-beginners',
    title: 'Next.js for Beginners',
    description:
      'Graduate from CDN scripts to a real toolchain. Guided codelabs covering create-next-app, the App Router, pages, layouts, server vs client components, data fetching, and deploying to Vercel.',
    slug: 'nextjs-beginners',
    icon: '▲',
    color: '#0F172A',
    lessons: nextjsBeginnersLessons,
    prerequisites: ['react-fundamentals'],
  },
];

export function getModule(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getPrerequisiteModules(mod: Module): Module[] {
  if (!mod.prerequisites) return [];
  return mod.prerequisites.map((slug) => getModule(slug)).filter((m): m is Module => m !== undefined);
}

export function getLesson(moduleSlug: string, lessonSlug: string) {
  const mod = getModule(moduleSlug);
  if (!mod) return undefined;
  return mod.lessons.find((l) => l.slug === lessonSlug);
}

export function getNextLesson(moduleSlug: string, lessonSlug: string) {
  const mod = getModule(moduleSlug);
  if (!mod) return undefined;
  const idx = mod.lessons.findIndex((l) => l.slug === lessonSlug);
  if (idx === -1 || idx >= mod.lessons.length - 1) return undefined;
  return mod.lessons[idx + 1];
}
