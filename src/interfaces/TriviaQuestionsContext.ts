import { ReactNode } from 'react';
import { QuestionDataProps } from '../components/question/Question';

export interface TriviaQuestionsContextType {
  triviaQuestionsResponsesList: QuestionDataProps[];
  setTriviaQuestionsResponsesList: React.Dispatch<
    React.SetStateAction<QuestionDataProps[]>
  >;
}

export interface TriviaQuestionsProviderProps {
  children: ReactNode;
}
