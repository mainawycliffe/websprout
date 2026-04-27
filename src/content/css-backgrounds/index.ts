import type { Lesson } from "@/types/lesson";
import { lesson as whyBackgrounds } from "./01-why-backgrounds";
import { lesson as backgroundImage } from "./02-background-image";
import { lesson as sizePosition } from "./03-background-size-position";
import { lesson as backgroundRepeat } from "./04-background-repeat";
import { lesson as linearGradients } from "./05-linear-gradients";
import { lesson as radialConic } from "./06-radial-conic-gradients";
import { lesson as layered } from "./07-layered-backgrounds";
import { lesson as shorthand } from "./08-shorthand";
import { lesson as capstone } from "./09-capstone";
import { lesson as codelabGradientCard } from "./10-codelab-gradient-card";

export const cssBackgroundsLessons: Lesson[] = [
  whyBackgrounds,
  backgroundImage,
  sizePosition,
  backgroundRepeat,
  linearGradients,
  radialConic,
  layered,
  shorthand,
  capstone,
  codelabGradientCard,
];
