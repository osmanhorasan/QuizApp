import { useEffect, useState } from "react";
import { getCtaReadList } from "../services/quiz.service";
import { IQuizQuestion } from "../interfaces/quiz.interface";
import { AxiosError } from "axios";
import { QuizContext } from "../contexts/QuizContext";

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<IQuizQuestion[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizzes = async () => {
    setLoading(true);
    setError(null);
    try {
      const quizData = await getCtaReadList();
      setData(quizData);
    } catch (error) {
      const axiosError = error as AxiosError; // Hatayı açıkça AxiosError olarak belirledik
      const message =
        axiosError.message || "An error occurred while fetching the cta list";
      console.error(`Fetch Cta List Error: ${message}`);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes(); // İlk yüklemede quiz'leri çekiyoruz.
  }, []);

  return (
    <QuizContext.Provider value={{ data, loading, error, fetchQuizzes }}>
      {children}
    </QuizContext.Provider>
  );
};
