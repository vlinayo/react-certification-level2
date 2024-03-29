import React from 'react';
import buttonStyles from './Button.module.scss';

export interface ButtonProps {
  buttonId: string;
  handleClick: () => void;
  children: React.ReactNode;
  isDisabled?: boolean;
  isSelected?: boolean;
  isCorrect?: boolean;
  highlightAnswer?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  buttonId,
  handleClick,
  children,
  isDisabled = false,
  isSelected,
  isCorrect,
  highlightAnswer,
}) => {
  const buttonCustomStyles = !highlightAnswer
    ? isSelected
      ? `${buttonStyles.button} ${buttonStyles['button--selected']}`
      : `${buttonStyles.button}`
    : !isSelected && !isCorrect
    ? `${buttonStyles.button}`
    : !isSelected && !!isCorrect
    ? `${buttonStyles.button} ${buttonStyles['button--correct']}`
    : !!isSelected && !isCorrect
    ? `${buttonStyles.button} ${buttonStyles['button--incorrect']}`
    : !!isSelected && !!isCorrect
    ? `${buttonStyles.button} ${buttonStyles['button--correct']}`
    : `${buttonStyles.button}`;

  return (
    <button
      className={buttonCustomStyles}
      id={buttonId}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
