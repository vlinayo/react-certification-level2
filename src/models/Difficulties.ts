import {
  DIFFICULTY_EASY_LABEL,
  DIFFICULTY_HARD_LABEL,
  DIFFICULTY_MEDIUM_LABEL,
} from '../constants/constants';
import { DifficultyOption } from '../interfaces/QuizMakerForm';

export const difficultyOptions: DifficultyOption[] = [
  { value: 1, label: DIFFICULTY_EASY_LABEL },
  { value: 2, label: DIFFICULTY_MEDIUM_LABEL },
  { value: 3, label: DIFFICULTY_HARD_LABEL },
];
