import React, { useState, useEffect, useCallback } from "react";
import { MainTimerTextStyle, TimerSection } from "@/styles/userStyles";
import { GlobalButton, PenaltyTimerText } from "@/components/styled/userStyles";
import { applyTimer } from "@/fetch/api/timer/timerUpdate";
import { useFetchTimer } from "@/fetch/fetch";
import styled from "styled-components";

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
    <StyledChangeTimer>
      <div>
        <div>
          <div>Минуты</div>
          <StyledTimerInput
            type="number"
            value={penaltyMinutes}
            onChange={(e) => setPenaltyMinutes(Number(e.target.value))}
            placeholder="Минуты"
          />
        </div>
        <div>
          <div>Секунды</div>
          <StyledTimerInput
            type="number"
            value={penaltySeconds}
            onChange={(e) => setPenaltySeconds(Number(e.target.value))}
            placeholder="Секунды"
          />
        </div>
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
      <StyledUpdateTimerSection>
        <PenaltyTimerText>
          {String(penaltyMinutes).padStart(2, "0")}:
          {String(penaltySeconds).padStart(2, "0")}
        </PenaltyTimerText>
        <StyledUpdateTimerButton onClick={handleUpdate}>
          Update timer
        </StyledUpdateTimerButton>
      </StyledUpdateTimerSection>
    </StyledChangeTimer>
  );
};

const StyledChangeTimer = styled(TimerSection)`
  flex-direction: column;

  width: 40%;
  align-self: center;

  margin-top: -20%;
`;

const StyledTimerInput = styled.input`
  border-radius: 5px;
  color: black;
  padding-left: 5px;
`;

const StyledUpdateTimerSection = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  margin-top: 10px;
`;

const StyledUpdateTimerButton = styled(GlobalButton)`
  height: 40px;
`;
