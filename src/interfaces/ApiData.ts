export interface TriviaCategories {
  id: number;
  name: string;
}

export interface Question {
  type: string;
  category: string;
  correct_answer: string;
  difficulty: string;
  question: string;
  incorrect_answers: string[];
}
