import React from 'react';

export const LinearBorder = ({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) => {
  return (
    <div className={`w-full rounded-[14px] bg-gradient-to-r p-[2px] ${className}`}>
      <div
        className={`w-full rounded-[14px] bg-gradient-to-r p-[clamp(1rem,2vw,2rem)] text-center ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
};
