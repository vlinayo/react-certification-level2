import React from 'react';
import Question, { QuestionDataProps } from '../question/Question';

export interface QuestionListProps {
  questionsList: QuestionDataProps[];
  handleSelectedAnswer?: (position: number, value: string) => void;
  showAnswers?: boolean;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questionsList,
  handleSelectedAnswer,
  showAnswers,
}) => {
  const handleAnswer = (index: number, option: string) => {
    if (handleSelectedAnswer) {
      handleSelectedAnswer(index, option);
    }
  };
  return (
    <>
      {questionsList.map((questionData, index) => (
        <Question
          key={questionData.question}
          question={questionData.question}
          options={questionData.options}
          correctAnswer={questionData.correctAnswer}
          onSelectedAnswer={(option: string) => handleAnswer(index, option)}
          selectedAnswer={questionData.selectedAnswer}
          showAnswer={showAnswers}
        />
      ))}
    </>
  );
};

export default QuestionList;
