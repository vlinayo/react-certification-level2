import { useContext } from 'react';
import { TriviaQuestionsContext } from '../store/QuizContext';
import { ERROR_TRIVIA_CONTENXT } from '../constants/constants';

// Custom hook to use the context
export const useTriviaQuestionsContext = () => {
  const context = useContext(TriviaQuestionsContext);
  if (!context) {
    throw new Error(ERROR_TRIVIA_CONTENXT);
  }
  return context;
};
