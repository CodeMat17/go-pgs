"use client";

import { cn } from "@/lib/utils";
// import { motion } from "framer-motion";

interface Step {
  title: string;
}

interface StepperProps {
  currentStep: number;
  steps: Step[];
  className?: string;
}

export function Stepper({ currentStep, steps, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
     
      <div className='flex justify-between relative'>
        {steps.map((step, index) => (
          <div key={index} className='flex flex-col items-center w-full'>
            <div className='relative flex flex-col items-center'>
              {/* Line between steps */}
              {/* {index > 0 && (
                <div className='absolute -left-[50%] -right-[50%] top-4 h-[2px] bg-muted'>
                  {index <= currentStep && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      className='h-full bg-primary'
                    />
                  )}
                </div>
              )} */}

              {/* Step circle */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-gray-200",
                  index <= currentStep ? "bg-amber-500" : "bg-gray-700"
                )}>
                {index < currentStep ? (
                  <CheckIcon className='h-4 w-4 text-white' />
                ) : (
                  <span
                    className={cn(
                      "text-sm font-medium",
                      index <= currentStep
                        ? "text-white"
                        : "text-muted-foreground"
                    )}>
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Step title */}
              <p
                className={cn(
                  "mt-2 text-sm text-center",
                  index <= currentStep
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}>
                {step.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
          strokeLinejoin='round' 
      >
      <path d='M20 6 9 17l-5-5' />
    </svg>
  );
}
