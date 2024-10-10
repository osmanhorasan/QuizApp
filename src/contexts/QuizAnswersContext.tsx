import { createContext, useContext } from 'react';
import { IQuizQuestionAnswer } from '../interfaces/quiz.interface';

// Context tipini tanımlayın
interface QuizAnswersContextType {
  answers: (IQuizQuestionAnswer | null)[]; // Cevaplar null olabilir
  setAnswer: (index: number, answer: IQuizQuestionAnswer | null) => void;
}

// Context'i oluşturun
const QuizAnswersContext = createContext<QuizAnswersContextType | undefined>(undefined);

// Context'i kullanmak için Hook
export const useQuizAnswersContext = (): QuizAnswersContextType => {
  const context = useContext(QuizAnswersContext);
  if (!context) {
    throw new Error('useQuizAnswersContext, QuizAnswersProvider içinde kullanılmalıdır');
  }
  return context;
};

export default QuizAnswersContext;
