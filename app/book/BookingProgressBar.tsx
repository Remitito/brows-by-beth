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
    <div className="flex w-screen flex-row  items-center  px-6 md:px-12  justify-between mt-8">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center flex-shrink-0">
            <button
              onClick={() => goToStep(index)}
              disabled={index >= currentStep || isCompleted}
              className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full text-sm md:text-lg font-bold transition-all duration-300
                ${
                  index < currentStep
                    ? "bg-green-500 text-white cursor-pointer hover:bg-green-600"
                    : ""
                }
                ${
                  index === currentStep
                    ? "bg-blue-500 text-white scale-110"
                    : ""
                }
                ${
                  index > currentStep
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : ""
                }
                ${isCompleted && "bg-green-500 text-white"}`}
            >
              {isCompleted ? "✓" : index + 1}
            </button>
            <p
              className={`mt-2 text-xs md:text-sm text-center transition-colors duration-300 ${
                index === currentStep
                  ? "font-bold text-gray-800"
                  : "text-gray-500"
              } ${isCompleted && "text-gray-800"}`}
            >
              {step}
            </p>
          </div>

          {/* Connecting line */}
          {index < steps.length - 1 && (
            <div
              className={`h-1 flex-1 transition-colors duration-500 md:mx-2 bg-gray-300
                ${index < currentStep || isCompleted ? "md:bg-green-500" : ""}
                hidden md:block 
              `}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
