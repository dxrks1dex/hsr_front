import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { PenaltyTimerText } from "@/components/styled/userStyles";

interface Props {
  timer: number;
  penaltyTimer: number;
  timerData: number;

  isPickStarted: boolean;

  setTimer: Dispatch<SetStateAction<number>>;
  setPenaltyTimer: Dispatch<SetStateAction<number>>;
}

export const usePickTimer = ({
  setTimer,
  timer,
  penaltyTimer,
  setPenaltyTimer,
  isPickStarted,
  timerData,
}: Props) => {
  const timerReset = useCallback(() => {
    setTimer(timerData);

    console.log("timer data: ", timerData);
  }, [setTimer, timerData]);

  useEffect(() => {
    if (isPickStarted) {
      const pickTime = setInterval(() => {
        setTimer((prevSeconds) => prevSeconds - 1);
      }, 1000);

      if (timer === 0) {
        clearInterval(pickTime);
      }

      return () => clearInterval(pickTime);
    }
  }, [isPickStarted, setTimer, timer]);

  useEffect(() => {
    if (timer === 0 && isPickStarted) {
      const totalTimer = setInterval(() => {
        setPenaltyTimer((prevSeconds) => prevSeconds - 1);
      }, 1000);

      if (penaltyTimer === 0) {
        clearInterval(totalTimer);
      }

      return () => clearInterval(totalTimer);
    }
  }, [isPickStarted, timer, penaltyTimer, setPenaltyTimer]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return {
    totalTimer: formatTime(penaltyTimer),
    currentTimer: formatTime(timer),
    timerReset,
  };
};
