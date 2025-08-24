// src/app/signup/components/ProgressSteps.jsx
"use client"
import { FiCheck } from 'react-icons/fi';

const ProgressSteps = ({ step }) => {
  const steps = [
    { number: 1, title: "Step 1", subtitle: "Personal Info" },
    { number: 2, title: "Step 2", subtitle: "Security" },
    { number: 3, title: "Step 3", subtitle: "Phone Verify (Required)" },
    { number: 4, title: "Step 4", subtitle: "Profile Image (Optional)" }
  ];

  return (
    <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-red-200 shadow-lg">
      <div className="flex items-center justify-between">
        {steps.map((stepItem, index) => (
          <div key={stepItem.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                step >= stepItem.number ? 'bg-red-900 border-red-900 text-white shadow-lg' : 
                step === stepItem.number ? 'bg-red-100 border-red-900 text-red-900' : 'bg-white border-red-300 text-red-600'
              }`}>
                {step > stepItem.number ? <FiCheck className="w-6 h-6" /> : stepItem.number}
              </div>
              <div className="ml-3 hidden sm:block">
                <div className="text-sm font-semibold text-red-900">{stepItem.title}</div>
                <div className="text-xs text-red-600">{stepItem.subtitle}</div>
              </div>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                step > stepItem.number ? 'bg-red-900' : 'bg-red-200'
              }`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;