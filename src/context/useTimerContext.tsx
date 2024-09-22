"use client";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { CharacterData } from "@/types/interface";

interface ITimer {
  data: {
    mainTimer: number;
  };
  operations: {
    setMainTimer: Dispatch<SetStateAction<number>>;
    resetMainTimer: () => void;
  };
}

const Timer = createContext<ITimer | null>(null);
export const TimerContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mainTimer, setMainTimer] = useState(30);

  const resetMainTimer = useCallback(() => {
    setMainTimer(30);
  }, []);

  const context: ITimer = useMemo(
    () => ({
      data: {
        mainTimer,
      },
      operations: {
        setMainTimer,
        resetMainTimer,
      },
    }),
    [mainTimer],
  );

  return <Timer.Provider value={context}>{children}</Timer.Provider>;
};

export const useTimerContext = (): ITimer => {
  const value = useContext(Timer);
  if (value === null) {
    throw new Error("empty Timer context");
  }

  return value;
};
