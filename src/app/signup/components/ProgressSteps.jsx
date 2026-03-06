// src/app/signup/components/ProgressSteps.jsx
"use client"
import React from 'react';
import { FiCheck } from 'react-icons/fi';

const ProgressSteps = ({ step }) => {
  const steps = [
    { number: 1, title: "Personal", subtitle: "Your details" },
    { number: 2, title: "Security", subtitle: "Password setup" },
    { number: 3, title: "Phone", subtitle: "Verification" },
    { number: 4, title: "Profile", subtitle: "Optional" }
  ];

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-start w-full">
        {steps.map((stepItem, index) => (
          <React.Fragment key={stepItem.number}>
            {/* Step: circle + label stacked vertically */}
            <div className="flex flex-col items-center shrink-0">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 ${
                step > stepItem.number
                  ? 'bg-[#800000] border-[#800000] text-white shadow-sm shadow-[#800000]/20'
                  : step === stepItem.number
                  ? 'bg-[#800000]/5 border-[#800000] text-[#800000] shadow-sm shadow-[#800000]/10'
                  : 'bg-gray-50 border-gray-200 text-gray-300'
              }`}>
                {step > stepItem.number ? (
                  <FiCheck className="w-4 h-4" strokeWidth={3} />
                ) : (
                  <span className="text-xs font-bold">{stepItem.number}</span>
                )}
              </div>
              <div className="mt-1.5 text-center hidden sm:block">
                <div className={`text-xs font-semibold transition-colors duration-300 whitespace-nowrap ${
                  step >= stepItem.number ? 'text-gray-800' : 'text-gray-300'
                }`}>{stepItem.title}</div>
                <div className={`text-[11px] transition-colors duration-300 whitespace-nowrap ${
                  step >= stepItem.number ? 'text-gray-400' : 'text-gray-200'
                }`}>{stepItem.subtitle}</div>
              </div>
            </div>

            {/* Connector Line: mt-5 (20px) aligns with center of h-10 (40px) circle */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-[2px] mt-5 mx-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-[#800000] rounded-full transition-all duration-700 ease-out ${
                    step > stepItem.number ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
