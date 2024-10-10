import React, { useState } from "react";
import QuizAnswersContext from "../contexts/QuizAnswersContext";
import { IQuizQuestionAnswer } from "../interfaces/quiz.interface";

// Provider bileşeni
export const QuizAnswersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [answers, setAnswers] = useState<(IQuizQuestionAnswer | null)[]>([]); // null da içerebilir

  const setAnswer = (index: number, answer: IQuizQuestionAnswer | null) => {
    setAnswers((prev) => {
      const newAnswers = [...prev]; // Mevcut cevapların bir kopyasını oluştur
      newAnswers[index] = answer; // İlgili indeksteki cevabı güncelle
      return newAnswers;
    });
  };

  return (
    <QuizAnswersContext.Provider value={{ answers, setAnswer }}>
      {children}
    </QuizAnswersContext.Provider>
  );
};
