import { useState } from 'react';
import quizStyles from './Quiz.module.scss';
import { useNavigate } from 'react-router-dom';
import { Question } from '../../interfaces/ApiData';
import { QuestionDataProps } from '../../components/question/Question';
import { difficultyOptions } from '../../models/Difficulties';
import { fisherYatesShuffle } from '../../utils/algorithms';
import Dropdown from '../../components/dropdown/Dropdown';
import Button from '../../components/button/Button';
import QuestionList from '../../components/question-list/QuestionList';
import { useTriviaQuestionsContext } from '../../hooks/TriviaContextHook';
import { useQuizMakerCategoriesHook } from '../../hooks/QuizMakerHook';
import {
  CATEGORIES_LABEL,
  DIFFICULTIES_LABEL,
  ERROR_QUIZ_QUESTIONS_FETCH,
  HOST,
} from '../../constants/constants';

const Quiz = () => {
  const [selectedCategory, setSelectedValue] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');

  const navigate = useNavigate();
  const categories = useQuizMakerCategoriesHook();
  const { triviaQuestionsResponsesList, setTriviaQuestionsResponsesList } =
    useTriviaQuestionsContext();
  const allQuestionsAnswered =
    triviaQuestionsResponsesList.length > 0 &&
    triviaQuestionsResponsesList.every(
      (question) => question.selectedAnswer !== ''
    );

  /**
   * Method used to handle the element selected on the category dropdown
   */
  const handleSelectCategory = (value: string) => {
    setSelectedValue(value);
  };

  /**
   * Method used to handle the element selected on the difficulty dropdown
   */
  const handleSelectDifficulty = (value: string) => {
    const difficultyLabel = difficultyOptions.find(
      (difficulty) => difficulty.value.toString() === value.toString()
    )?.label;
    if (difficultyLabel)
      setSelectedDifficulty(difficultyLabel.toLocaleLowerCase());
  };

  /**
   * Method used to fetch the questions based on the category and difficulty selection
   */
  const getQuizQuestions = async () => {
    const response = await fetch(
      `${HOST}/api.php?amount=5&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`
    );
    if (!response.ok) {
      throw new Error(ERROR_QUIZ_QUESTIONS_FETCH);
    }
    const data = await response.json();
    const questions: Question[] = data.results;
    const quizQuestions: QuestionDataProps[] = questions.map(
      (question: Question) => {
        const shuffledOptions: string[] = fisherYatesShuffle([
          ...question.incorrect_answers,
          question.correct_answer,
        ]);

        return {
          question: question.question,
          correctAnswer: question.correct_answer,
          options: shuffledOptions,
          selectedAnswer: '', //initialize the selected answer for each question
        };
      }
    );
    setTriviaQuestionsResponsesList(quizQuestions);
  };

  /**
   * Method used to handle the trigger for fetching the quiz
   * if previews quiz data exist, it clears it and sets the data again to empty
   */
  const handleCreateClick = () => {
    if (triviaQuestionsResponsesList.length > 0) {
      setTriviaQuestionsResponsesList([]);
    }
    getQuizQuestions();
  };

  /**
   * Method used to manage the behavior when users selects an answer from the quiz questions
   * It creates a copy of the original questions, adds the selected option into the corresponding question element
   * And it stores the current state of the quiz with its questions and selected answers
   */
  const handleSelectedAnswer = (
    questionIndex: number,
    selectedOption: string
  ) => {
    const copyQuestionsList = [...triviaQuestionsResponsesList];
    copyQuestionsList[questionIndex].selectedAnswer = selectedOption;
    setTriviaQuestionsResponsesList(copyQuestionsList);
  };

  /**
   * Method used to handle the actions of the submit button
   * It redirects the user to the results page
   */
  const handleSubmit = () => {
    navigate('/results');
  };

  return (
    <>
      <h1>Quiz Maker</h1>
      <div className={quizStyles.quiz__container}>
        {/* Dropdowns & Button container */}
        <Dropdown
          idAttr="categorySelect"
          label={CATEGORIES_LABEL}
          options={categories}
          onSelect={handleSelectCategory}
        />
        <Dropdown
          idAttr="difficultySelect"
          label={DIFFICULTIES_LABEL}
          options={difficultyOptions}
          onSelect={handleSelectDifficulty}
        />
        <Button buttonId="createBtn" handleClick={handleCreateClick}>
          Create
        </Button>
      </div>
      {triviaQuestionsResponsesList && triviaQuestionsResponsesList.length > 0 && (
        <div className={quizStyles.quiz__list}>
          <QuestionList
            questionsList={triviaQuestionsResponsesList}
            handleSelectedAnswer={handleSelectedAnswer}
          />
          {allQuestionsAnswered && (
            <Button buttonId="submitBtn" handleClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default Quiz;
