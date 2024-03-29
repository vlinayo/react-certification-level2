import React from 'react';
import questionStyle from './Question.module.scss';
import { htmlParser } from '../../utils/dataParsers';
import Button from '../button/Button';

export interface QuestionDataProps {
  question: string;
  options: string[];
  correctAnswer: string;
  showAnswer?: boolean;
  selectedAnswer?: string;
  onSelectedAnswer?: (value: string) => void;
}

const Question: React.FC<QuestionDataProps> = ({
  question,
  options,
  correctAnswer,
  showAnswer = false,
  onSelectedAnswer,
  selectedAnswer,
}) => {
  const handleSelectedOption = (selectedOption: string) => {
    if (onSelectedAnswer) {
      onSelectedAnswer(selectedOption);
    }
  };

  return (
    <div className={questionStyle.question__container}>
      <p>{htmlParser(question)}</p>
      <div className={questionStyle.options__container}>
        {options.map((option) => {
          return (
            <Button
              key={`button-${option}`}
              buttonId={`button-${option}`}
              isSelected={option === selectedAnswer}
              handleClick={() => handleSelectedOption(option)}
              isCorrect={option === correctAnswer}
              highlightAnswer={!!showAnswer}
            >
              {htmlParser(option)}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
