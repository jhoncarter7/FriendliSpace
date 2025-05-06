import React from 'react';

interface ToggleProps {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'success';
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  isChecked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const id = React.useId();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked);
    }
  };
  
  const sizeStyles = {
    sm: {
      switch: 'w-8 h-4',
      knob: 'w-3 h-3',
      knobTranslate: 'translate-x-4',
      text: 'text-sm',
    },
    md: {
      switch: 'w-11 h-6',
      knob: 'w-5 h-5',
      knobTranslate: 'translate-x-5',
      text: 'text-base',
    },
    lg: {
      switch: 'w-14 h-7',
      knob: 'w-6 h-6',
      knobTranslate: 'translate-x-7',
      text: 'text-lg',
    },
  };
  
  const colorStyles = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    accent: 'bg-accent-600',
    success: 'bg-success-600',
  };
  
  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
        />
        
        <div
          className={`
            ${sizeStyles[size].switch}
            ${isChecked ? colorStyles[color] : 'bg-gray-300'}
            rounded-full transition-colors duration-200
          `}
        ></div>
        
        <div
          className={`
            absolute
            ${sizeStyles[size].knob}
            bg-white 
            rounded-full 
            shadow
            transform 
            transition-transform 
            duration-200
            ${isChecked ? sizeStyles[size].knobTranslate : 'translate-x-0.5'}
          `}
        ></div>
      </div>
      
      {label && (
        <span className={`ml-3 ${sizeStyles[size].text} text-gray-900`}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Toggle;