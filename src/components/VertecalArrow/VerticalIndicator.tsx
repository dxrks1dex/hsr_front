import styled from "styled-components";
import { useEffect, useState } from "react";
import { useFetchPickAndBans } from "@/fetch/fetch";
import { CharacterData } from "@/types/interface";

export function VerticalIndicator({
  currentPlayer,
}: {
  currentPlayer: number;
}) {
  const { data, isLoading, error } = useFetchPickAndBans();
  const [items, setItems] = useState<CharacterData[]>([]);

  useEffect(() => {
    if (data && !isLoading) {
      const firstPlayer = data[0]?.firstPlayer || {};
      const secondPlayer = data[0]?.secondPlayer || {};

      const combinedPicks = [
        ...(firstPlayer.picked || []),
        ...(secondPlayer.picked || []),
        ...(firstPlayer.banned || []),
        ...(secondPlayer.banned || []),
      ];

      setItems(combinedPicks);
    }
  }, [data, isLoading]);

  const getStepColor = (index: number, isActive: boolean) => {
    if (index === 0 || index === 6) {
      return isActive ? "#E31D1D" : "#E31D1D"; // Красный для 1ых и 5ых
    }
    return isActive ? "#18FFCB" : "#18FFCB"; // Зеленый для активных
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <LineDiv>
      <ProgressBarContainer>
        {Array.from({ length: 20 }).map((_, index) => {
          const isCompleted = index < items.length;
          const isActive = index === items.length;

          return (
            <ProgressSegment
              key={index}
              isCompleted={isCompleted}
              isActive={isActive}
              stepColor={getStepColor(index, isActive)}
              style={{
                opacity: isCompleted || isActive ? 1 : 0.5,
              }}
            >
              <ProgressStep
                isActiveStep={isActive}
                isCompletedStep={isCompleted}
                stepColor={getStepColor(index, isActive)}
                style={{
                  opacity:
                    index === 0 || index === 6
                      ? 1
                      : isCompleted || isActive
                        ? 1
                        : 0.5,
                }}
              />
              {/* Уменьшаем расстояние между черточками */}
              <ProgressTick topPosition={40} left={-25} /> {/* Левый тик */}
              <ProgressTick topPosition={60} left={110} /> {/* Правый тик */}
            </ProgressSegment>
          );
        })}
      </ProgressBarContainer>

      <TextForVision>Элементов в массиве: {items.length}/20</TextForVision>
    </LineDiv>
  );
}

const TextForVision = styled.div`
  opacity: 0%;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 7%;
  height: 700px;
  background-color: #f0f0f0;
  overflow: hidden;
  margin-top: 1.25rem;
  position: relative;
`;

const ProgressSegment = styled.div<{
  isCompleted: boolean;
  isActive: boolean;
  stepColor: string;
}>`
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.stepColor};
  opacity: ${(props) => (props.isCompleted || props.isActive ? 1 : 0.5)};
  transition:
    background-color 0.3s ease,
    opacity 0.3s ease;
  position: relative;
`;

const ProgressStep = styled.div<{
  isActiveStep: boolean;
  isCompletedStep: boolean;
  stepColor: string;
}>`
  position: absolute;
  top: ${(props) => (props.isActiveStep ? "0" : "50%")};
  width: 100%;
  height: 50%;
  background-color: ${(props) => props.stepColor};
  opacity: ${(props) =>
    props.isActiveStep || props.isCompletedStep ? 1 : 0.5};
`;

const ProgressTick = styled.div<{ topPosition: number; left: number }>`
  position: absolute;
  top: ${(props) => `${props.topPosition}%`};
  left: ${(props) =>
    `${props.left}%`}; /* Положение тика относительно левого края */
  transform: translateY(-50%);
  height: 2px;
  width: 15px;
  background-color: #000;
`;

const LineDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  justify-self: center;
  justify-content: center;
`;
