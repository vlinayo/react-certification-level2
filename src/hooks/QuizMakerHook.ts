import { useEffect, useState } from 'react';
import { DropdownOption } from '../interfaces/Dropdown';
import { TriviaCategories } from '../interfaces/ApiData';
import { QuestionDataProps } from '../components/question/Question';
import { ERROR_CATEGORIES_FETCH, HOST } from '../constants/constants';

export const useQuizMakerCategoriesHook = () => {
  const [categories, setCategories] = useState<DropdownOption[]>([]);

  useEffect(() => {
    // we fetch the data for the category dropdown:
    const getCategories = async () => {
      const response = await fetch(`${HOST}/api_category.php`);
      if (!response.ok) {
        throw new Error(ERROR_CATEGORIES_FETCH);
      }
      const data = await response.json();
      //data must be mapped into the options type for the dropdown
      const optionsData: DropdownOption[] = data.trivia_categories.map(
        (item: TriviaCategories) => ({
          value: item.id,
          label: item.name,
        })
      );
      setCategories(optionsData);
    };
    getCategories();
  }, []);

  return categories;
};

export const useCorretnessCalculatorHook = (
  triviaQuestionsResponsesList: QuestionDataProps[]
) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    // Count the number of correct answers
    const correctAnswersCount = triviaQuestionsResponsesList.reduce(
      (count, question) => {
        // If selectedAnswer matches correctAnswer, increment count
        if (question.selectedAnswer === question.correctAnswer) {
          return count + 1;
        }
        return count;
      },
      0
    );

    setCorrectAnswers(correctAnswersCount);
  }, []);

  return correctAnswers;
};
