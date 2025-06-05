import React from 'react';

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center w-full max-w-[1043px] h-[96px]">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Step */}
          <div
            className={`flex flex-col items-center justify-center rounded-[8px] h-[96px] ${
              index === currentStep
                ? 'bg-[#e7eff5] text-[#0a639d]'
                : 'bg-white text-[#b0b0b0]'
            }`}
            style={{ width: step.width }}
          >
            <span className="text-[20px] font-semibold font-opensans mb-1">
              Step {index + 1}
            </span>
            <span className="text-[24px] font-bold font-opensans">
              {step.title}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="w-[178px] h-[2px] bg-[#9bbfd7]" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;