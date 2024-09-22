import React, { useState, useEffect, useCallback } from "react";
import { MainTimerTextStyle, TimerSection } from "@/styles/userStyles";
import { PenaltyTimerText } from "@/components/styled/userStyles";
import { applyTimer } from "@/fetch/api/timer/timerUpdate";
import { useFetchTimer } from "@/fetch/fetch";

interface Props {
  isPickStarted: boolean;
}

export const ChangeTimer = ({ isPickStarted }: Props) => {
  const [penaltyMinutes, setPenaltyMinutes] = useState(0);
  const [penaltySeconds, setPenaltySeconds] = useState(0);
  const [mainMinutes, setMainMinutes] = useState(0);
  const [mainSeconds, setMainSeconds] = useState(0);

  const [inputMinutes, setInputMinutes] = useState(1);
  const [inputSeconds, setInputSeconds] = useState(0);

  const { data, isLoading, error } = useFetchTimer();

  useEffect(() => {
    if (data && !isLoading) {
      // setMainMinutes(data.mainTimer.minutes);
      // setMainSeconds(data.mainTimer.seconds);

      setPenaltyMinutes(data.penaltyTimer.minutes);
      setPenaltySeconds(data.penaltyTimer.seconds);
    }
  }, [data, isLoading]);

  const startPenaltyTimer = useCallback(() => {
    let penaltyTimer: NodeJS.Timeout | null = null;
    if (penaltyMinutes > 0 || penaltySeconds > 0) {
      penaltyTimer = setInterval(() => {
        if (penaltySeconds > 0) {
          setPenaltySeconds((prevSeconds) => prevSeconds - 1);
        } else if (penaltyMinutes > 0) {
          setPenaltyMinutes((prevMinutes) => prevMinutes - 1);
          setPenaltySeconds(59);
        }
      }, 1000);
    } else {
      clearInterval(penaltyTimer!);
    }

    return () => clearInterval(penaltyTimer!);
  }, [penaltyMinutes, penaltySeconds]);

  useEffect(() => {
    let mainTimer: NodeJS.Timeout | null = null;
    if (isPickStarted && (mainMinutes > 0 || mainSeconds > 0)) {
      mainTimer = setInterval(() => {
        if (mainSeconds > 0) {
          setMainSeconds((prevSeconds) => prevSeconds - 1);
        } else if (mainMinutes > 0) {
          setMainMinutes((prevMinutes) => prevMinutes - 1);
          setMainSeconds(59);
        }
      }, 1000);
    } else if (mainMinutes === 0 && mainSeconds === 0 && isPickStarted) {
      clearInterval(mainTimer!);
      startPenaltyTimer();
    }

    return () => clearInterval(mainTimer!);
  }, [isPickStarted, mainMinutes, mainSeconds, startPenaltyTimer]);

  const handleStart = () => {};

  const handleStop = () => {};

  const handleReset = () => {};

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMinutes(Number(e.target.value));
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSeconds(Number(e.target.value));
  };

  const handleUpdate = async () => {
    await applyTimer(penaltyMinutes, penaltySeconds);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <TimerSection>
      <PenaltyTimerText>
        {String(penaltyMinutes).padStart(2, "0")}:
        {String(penaltySeconds).padStart(2, "0")}
      </PenaltyTimerText>
      <div>
        <h2>Penalty timer</h2>
        <input
          type="number"
          value={penaltyMinutes}
          onChange={(e) => setPenaltyMinutes(Number(e.target.value))}
          placeholder="Минуты"
        />
        <input
          type="number"
          value={penaltySeconds}
          onChange={(e) => setPenaltySeconds(Number(e.target.value))}
          placeholder="Секунды"
        />
      </div>
      {/*<div>*/}
      {/*  <h2>Основной таймер</h2>*/}
      {/*  <input*/}
      {/*    type="number"*/}
      {/*    value={mainMinutes}*/}
      {/*    onChange={(e) => setMainMinutes(Number(e.target.value))}*/}
      {/*    placeholder="Минуты"*/}
      {/*  />*/}
      {/*  <input*/}
      {/*    type="number"*/}
      {/*    value={mainSeconds}*/}
      {/*    onChange={(e) => setMainSeconds(Number(e.target.value))}*/}
      {/*    placeholder="Секунды"*/}
      {/*  />*/}
      {/*</div>*/}
      <button onClick={handleUpdate}>Update timer</button>
    </TimerSection>
  );
};
