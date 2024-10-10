import { createContext, useContext } from "react";

// Timer context tipini tanımlama
interface TimerContextType {
  isTimeUp: boolean; // Zaman dolup dolmadığını belirten değişken
  isBlockTimeUp: boolean; // 10sn olmadığını belirten değişken
  timer: number;
  startTimer: () => void; // Zamanlayıcıyı başlatma fonksiyonu
  stopTimer: () => void; // Zamanlayıcıyı durdurma fonksiyonu
  resetTimer: () => void; // Zamanlayıcıyı sıfırlama fonksiyonu
}

// Timer context oluşturma
const TimerContext = createContext<TimerContextType | undefined>(undefined);

// Hook: TimerContext'i kullanma
export const useTimerContext = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return context;
};

export default TimerContext;
