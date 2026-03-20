import type { Lesson } from "@/types/lesson";
import { lesson as whyResponsive } from "./01-why-responsive";
import { lesson as viewportMeta } from "./02-viewport-meta";
import { lesson as relativeUnits } from "./03-relative-units";
import { lesson as mediaQueries } from "./04-media-queries";
import { lesson as mobileFirst } from "./05-mobile-first";
import { lesson as responsiveImages } from "./06-responsive-images";
import { lesson as responsiveTypography } from "./07-responsive-typography";
import { lesson as capstone } from "./08-capstone";
import { lesson as codelabResponsiveCard } from "./09-codelab-responsive-card";
import { lesson as codelabResponsiveNav } from "./10-codelab-responsive-nav";
import { lesson as codelabFullLayout } from "./11-codelab-full-layout";

export const responsiveDesignLessons: Lesson[] = [
  whyResponsive,
  viewportMeta,
  relativeUnits,
  mediaQueries,
  mobileFirst,
  responsiveImages,
  responsiveTypography,
  capstone,
  codelabResponsiveCard,
  codelabResponsiveNav,
  codelabFullLayout,
];
