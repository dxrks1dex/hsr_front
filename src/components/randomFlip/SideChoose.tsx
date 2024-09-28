"use client";
import { useState } from "react";
import styled from "styled-components";

export const SideChoose = () => {
  const [result, setResult] = useState<string | null>(null);
  const [rollValue, setRollValue] = useState(0);

  const handleClick = () => {
    const roll = Math.floor(Math.random() * 100) + 1;
    setRollValue(roll);
    const randomValue = roll < 50 ? "Red side" : "Blue side";
    setResult(randomValue);
  };

  return (
    <div>
      <StyledCoinButton onClick={handleClick}>Roll side</StyledCoinButton>
      {result ? (
        <StyledSideText color={result === "Red side" ? "#C84A32" : "#31A8FF"}>
          {result} ({rollValue})
        </StyledSideText>
      ) : (
        <StyledDefaultText>Win side</StyledDefaultText>
      )}
    </div>
  );
};

const StyledCoinButton = styled.div`
  border: 1px solid black;

  cursor: pointer;

  border-radius: 5px;

  padding: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;

  &:hover {
    transition: 0.4s;
    background-color: #3e3e3e;
    color: white;
  }
`;

const StyledDefaultText = styled.div`
  background-color: #3e3e3e;

  color: white;

  font-weight: 700;
  font-size: 4rem;

  padding: 2px;

  border-right: 5px;
`;

const StyledSideText = styled.div<{ color: string }>`
  color: ${({ color }) => color};

  background-color: #3e3e3e;

  font-weight: 700;
  font-size: 4rem;

  padding: 2px;

  border-right: 5px;
`;
