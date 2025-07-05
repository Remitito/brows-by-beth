import React from "react";

interface BookingProgressBarProps {
  steps: string[];
  currentStep: number;
  goToStep: (stepIndex: number) => void;
  isCompleted: boolean;
}

export const BookingProgressBar: React.FC<BookingProgressBarProps> = ({
  steps,
  currentStep,
  goToStep,
  isCompleted,
}) => {
  return (
    <div className="w-full max-w-4xl h-1/6 mx-auto flex flex-row items-start justify-between ">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center flex-shrink-0 text-center">
            <button
              onClick={() => goToStep(index)}
              disabled={index >= currentStep || isCompleted}
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all duration-300
                ${
                  index < currentStep || isCompleted
                    ? "bg-pink-500 text-white cursor-pointer hover:bg-pink-600"
                    : ""
                }
                ${
                  index === currentStep
                    ? "bg-pink-600 text-white ring-4 ring-pink-200"
                    : ""
                }
                ${index > currentStep ? "bg-gray-200 text-gray-500" : ""}`}
            >
              {isCompleted ? "✓" : index + 1}
            </button>
            <p
              className={`mt-2 text-xs w-16 transition-colors duration-300 ${
                index === currentStep
                  ? "font-semibold text-gray-800"
                  : "text-gray-500"
              } ${isCompleted && "text-gray-500"}`}
            >
              {step}
            </p>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`h-0.5 flex-1 transition-colors duration-500 mt-4  sm:mx-2
                ${
                  index < currentStep || isCompleted
                    ? "bg-pink-500"
                    : "bg-gray-200"
                }
              `}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
