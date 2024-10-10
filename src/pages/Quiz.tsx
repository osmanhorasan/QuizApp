import React, { useEffect, useState } from "react";
import { useQuizContext } from "../contexts/QuizContext";
import { GroupBox, Radio, Window, WindowContent, WindowHeader } from "react95";
import { useTimerContext } from "../contexts/TimerContext";
import { useQuizAnswersContext } from "../contexts/QuizAnswersContext";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const { data, loading, error, fetchQuizzes } = useQuizContext();
  const { isTimeUp, isBlockTimeUp, timer, startTimer, resetTimer } =
    useTimerContext();
  const { answers, setAnswer } = useQuizAnswersContext();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  useEffect(() => {
    fetchQuizzes();
    setAnswer(0, null);
  }, []);

  useEffect(() => {
    if (!loading && data) {
      startTimer();
    }
  }, [loading, data, startTimer]);

  useEffect(() => {
    if (isTimeUp) {
      setAnswer(currentQuestionIndex, {
        id: currentQuestion.id,
        option: {
          key: "", // Seçim yapılmadığında key "X"
          value: "Cevap Verilmedi", // Value boş
        },
        title: currentQuestion.title,
      });
      goToNextQuestion();
    }
  }, [isTimeUp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (!isBlockTimeUp) return;

    let selectedKey: string | undefined; // Türü string ya da undefined olarak tanımlıyoruz
    let selectedOption;

    // Eğer seçim yapılmışsa
    if (e) {
      selectedKey = e.target.value;
      selectedOption = currentQuestion.options.find(
        (option) => option.key === selectedKey
      );
    }

    // Eğer bir seçenek yoksa varsayılan değerleri ayarlayın
    if (!selectedOption) {
      setAnswer(currentQuestionIndex, {
        id: currentQuestion.id,
        option: {
          key: "", // Seçim yapılmadığında key "X"
          value: "Cevap Verilmedi", // Value boş
        },
        title: currentQuestion.title,
      });
    } else {
      // Seçilen cevabı kaydediyoruz
      setAnswer(currentQuestionIndex, {
        id: currentQuestion.id,
        option: {
          key: selectedOption.key,
          value: selectedOption.value,
        },
        title: currentQuestion.title,
      });
    }
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < (data ? data.length : 0) - 1) {
      resetTimer();
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate("/resultspage");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No Questions Available</div>; // data null olduğunda

  const currentQuestion = data[currentQuestionIndex];

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <Window>
        <WindowHeader className="flex gap-5 items-center justify-between !h-[40px] w-full">
          <span>{currentQuestionIndex + 1}. Soru</span>
          <span>{timer} sn</span>
        </WindowHeader>
        <WindowContent>
          <h2 className="p-2 rounded-md mb-5 font-medium bg-white">
            {currentQuestion.title}
          </h2>
          <GroupBox label="Seçenekler">
            {currentQuestion.options.map((qtn) => (
              <div className="flex gap-2" key={qtn.key}>
                <Radio
                  checked={
                    answers[currentQuestionIndex]?.option.key === qtn.key
                  }
                  onChange={handleChange}
                  value={qtn.key}
                  name="question"
                  disabled={!isBlockTimeUp}
                />
                <p className="md:text-nowrap">{qtn.value}</p>
              </div>
            ))}
          </GroupBox>
        </WindowContent>
      </Window>
    </div>
  );
}

export default Quiz;
