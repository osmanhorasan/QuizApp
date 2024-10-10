import { createContext, useContext } from "react";
import { IQuizQuestion } from "../interfaces/quiz.interface";

interface QuizContextType {
  data: IQuizQuestion[] | null;
  loading: boolean;
  error: string | null;
  fetchQuizzes: () => void;
}

// QuizContext'i dışa aktararak Provider'da kullanabiliriz.
export const QuizContext = createContext<QuizContextType | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useQuizContext = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
};
