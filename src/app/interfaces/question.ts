export interface Question {
  difficulty: string;
  question: string;
  correctAnswer: string;
  incorrectsAnswers: string[];
  shuffleAnswers: string[]|any;
}
