import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import { useTriviaQuestionsContext } from '../../hooks/TriviaContextHook';
import QuestionList from '../../components/question-list/QuestionList';
import resultsStyles from './Results.module.scss';
import { useCorretnessCalculatorHook } from '../../hooks/QuizMakerHook';

const Results = () => {
  const navigate = useNavigate();
  const { triviaQuestionsResponsesList, setTriviaQuestionsResponsesList } =
    useTriviaQuestionsContext();
  const correctAnswers = useCorretnessCalculatorHook(
    triviaQuestionsResponsesList
  );

  /**
   * Method used to handle the behavior of the finish button
   * It clears the stored questions data
   * And navigates the user to the quiz maker screen
   */
  const handleFinish = () => {
    setTriviaQuestionsResponsesList([]);
    navigate('/react-certification-leve2/');
  };

  const correctnessScaleClass =
    correctAnswers <= 1
      ? `${resultsStyles['score--red']}`
      : correctAnswers >= 2 && correctAnswers <= 3
      ? `${resultsStyles['score--yellow']}`
      : `${resultsStyles['score-green']}`;

  return (
    <div>
      <h1>Results</h1>
      <div className={resultsStyles.questions__list}>
        <QuestionList
          questionsList={triviaQuestionsResponsesList}
          showAnswers
        />
        <p className={`${resultsStyles.score} ${correctnessScaleClass}`}>
          You scored {correctAnswers} out of 5
        </p>
        <Button buttonId="finishBtn" handleClick={handleFinish}>
          Create a new quiz
        </Button>
      </div>
    </div>
  );
};
export default Results;
