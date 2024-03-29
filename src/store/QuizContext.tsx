import React, { createContext, useState } from 'react';
import {
  TriviaQuestionsContextType,
  TriviaQuestionsProviderProps,
} from '../interfaces/TriviaQuestionsContext';
import { QuestionDataProps } from '../components/question/Question';

export const TriviaQuestionsContext = createContext<TriviaQuestionsContextType>(
  {
    triviaQuestionsResponsesList: [],
    setTriviaQuestionsResponsesList: () => {},
  }
);

export const TriviaQuestionsProvider: React.FC<TriviaQuestionsProviderProps> =
  ({ children }) => {
    const [triviaQuestionsResponsesList, setTriviaQuestionsResponsesList] =
      useState<QuestionDataProps[]>([]);

    return (
      <TriviaQuestionsContext.Provider
        value={{
          triviaQuestionsResponsesList,
          setTriviaQuestionsResponsesList,
        }}
      >
        {children}
      </TriviaQuestionsContext.Provider>
    );
  };
