"use client";

import Button from "@/components/ui/Button";
import StepDots from "@/components/ui/StepDots";

interface LessonStepperProps {
  totalSteps: number;
  currentStep: number;
  completedSteps: Set<number>;
  onStepClick: (step: number) => void;
  onNext: () => void;
  onPrev: () => void;
  canProgress: boolean;
}

export default function LessonStepper({
  totalSteps,
  currentStep,
  completedSteps,
  onStepClick,
  onNext,
  onPrev,
  canProgress,
}: LessonStepperProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex flex-col gap-4">
      {/* Step indicator */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-muted font-medium">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <StepDots
          total={totalSteps}
          current={currentStep}
          completed={completedSteps}
          onStepClick={onStepClick}
        />
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrev}
          disabled={isFirstStep}
        >
          &#8592; Back
        </Button>
        <Button
          variant={canProgress ? "success" : "primary"}
          size="md"
          onClick={onNext}
          disabled={false}
        >
          {isLastStep ? "Complete!" : "Next Step \u2192"}
        </Button>
      </div>
    </div>
  );
}
