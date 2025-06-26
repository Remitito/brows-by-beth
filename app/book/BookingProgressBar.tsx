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
    <div className="w-full max-w-4xl mt-8">
      <div className="flex items-start">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <button
                onClick={() => goToStep(index)}
                // A step is clickable if it's already passed, but not if the whole process is complete
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
                  ${isCompleted && "bg-green-500 text-white"}
                `}
              >
                {isCompleted ? "✓" : index + 1}
              </button>
              <p
                className={`mt-2 text-xs md:text-sm text-center w-20 transition-colors duration-300 ${
                  index === currentStep
                    ? "font-bold text-gray-800"
                    : "text-gray-500"
                } ${isCompleted && "text-gray-800"}`}
              >
                {step}
              </p>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mt-4 md:mt-5 mx-1 md:mx-2 transition-colors duration-500 ${
                  index < currentStep || isCompleted
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
