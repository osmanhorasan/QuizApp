import React, { useEffect, useState, useRef } from "react";
import TimerContext from "../contexts/TimerContext";

// TimerProvider bileşeni
export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const [isBlockTimeUp, setIsBlockTimeUp] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const totalTimerRef = useRef<NodeJS.Timeout | null>(null); // 30 saniyelik zamanlayıcı referansı
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Her saniyede artan zamanlayıcı referansı
  const blockTimerRef = useRef<NodeJS.Timeout | null>(null); // Bloklama zamanlayıcısı referansı

  const startTimer = () => {
    if (blockTimerRef.current) return; // Zaten başlatılmışsa blok zamanlayıcısını tekrar başlatma

    // 10 saniye için bloklama zamanlayıcı başlat
    blockTimerRef.current = setTimeout(() => {
      setIsBlockTimeUp(true); // 10 saniye sonra true yap
    }, 10000); // 10 saniye
  };

  const stopTimer = () => {
    if (totalTimerRef.current) {
      clearTimeout(totalTimerRef.current); // 30 saniyelik zamanlayıcıyı durdur
      totalTimerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Her saniye artan intervali durdur
      intervalRef.current = null;
    }
    if (blockTimerRef.current) {
      clearTimeout(blockTimerRef.current); // Bloklama zamanlayıcısını durdur
      blockTimerRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer(); // Zamanlayıcıları durdur ve sıfırla
    setIsTimeUp(false); // Zaman doldu durumunu sıfırla
    setIsBlockTimeUp(false); // Bloklama durumu sıfırlanır
    setTimer(0); // Sayaç sıfırlanır
    startTotalTimer(); // Zamanlayıcı yeniden başlatılır
  };

  // 30 saniyelik zamanlayıcıyı başlatır ve her saniye timer'ı artırır
  const startTotalTimer = () => {
    // 30 saniye sonra zamanlayıcıyı durdur ve isTimeUp'ı true yap
    totalTimerRef.current = setTimeout(() => {
      setIsTimeUp(true); // Zaman doldu
      stopTimer(); // Zamanlayıcıyı tamamen durdur
    }, 30000); // 30 saniye

    // Her saniye timer'ı artır
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000); // 1 saniye aralık
  };

  // Bileşen yüklendiğinde zamanlayıcı başlar
  useEffect(() => {
    startTotalTimer(); // Zamanlayıcıyı başlat

    // Cleanup: Bileşen unmount olduğunda zamanlayıcıyı temizle
    return () => {
      stopTimer(); // Tüm zamanlayıcıları temizle
    };
  }, []);

  return (
    <TimerContext.Provider
      value={{
        isTimeUp,
        isBlockTimeUp,
        timer,
        startTimer,
        stopTimer,
        resetTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
