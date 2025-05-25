
import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
}

interface CheckoutStepperProps {
  currentStep: number;
  steps: Step[];
}

export default function CheckoutStepper({ currentStep, steps }: CheckoutStepperProps) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                step.id < currentStep
                  ? 'bg-green-500 border-green-500 text-white'
                  : step.id === currentStep
                  ? 'bg-white border-green-500 text-green-500'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}
            >
              {step.id < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                <span className="text-sm font-medium">{step.id}</span>
              )}
            </div>
            <div className="ml-3">
              <h3
                className={`text-sm font-medium ${
                  step.id <= currentStep ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                {step.title}
              </h3>
            </div>
          </div>
          
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-4 transition-colors ${
                step.id < currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
