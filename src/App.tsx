import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import reactLogo from './assets/react.svg';
import './App.css';
import { TriviaQuestionsProvider } from './store/QuizContext';
import Results from './pages/results/Results';
import Quiz from './pages/quiz/Quiz';

const router = createBrowserRouter([
  {
    path: '/react-certification-leve2/',
    element: <Quiz />,
  },
  {
    path: '/react-certification-leve2/results',
    element: <Results />,
  },
  {
    path: '*',
    element: <Navigate to="/react-certification-leve2/" replace />,
  },
]);

function App() {
  return (
    <TriviaQuestionsProvider>
      <div className="container">
        <a
          href="https://lwfiles.mycourse.app/63d427fc109e10acef4f15d8-public/7e0dc4871f8631f5e4f5b995bfd4952b.png"
          target="_blank"
        >
          <img
            src={
              'https://lwfiles.mycourse.app/63d427fc109e10acef4f15d8-public/7e0dc4871f8631f5e4f5b995bfd4952b.png'
            }
            className="logo"
            alt="React certification logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <RouterProvider router={router} />
    </TriviaQuestionsProvider>
  );
}

export default App;
