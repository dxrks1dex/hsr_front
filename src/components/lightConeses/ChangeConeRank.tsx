import styled from "styled-components";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useOutsideDetect } from "@/utils/useOutsideDetect";

interface Props {
  onRankChoose: () => void;
  isCone: boolean;

  coneRank: number;
  onRankChange: (value: number) => void;
  setIsConeChangeRankOpen: Dispatch<SetStateAction<boolean>>;
}

export const ChangeConeRank = ({
  onRankChoose,
  coneRank,
  onRankChange,
  setIsConeChangeRankOpen,
  isCone,
}: Props) => {
  const wrapperRef = useRef(null);
  useOutsideDetect({ ref: wrapperRef, setIsOpen: setIsConeChangeRankOpen });

  return (
    <SliderContainer ref={wrapperRef}>
      <h3>Select {isCone ? "Superimposition" : "Eidolon"}</h3>
      <StyledSlider
        type="range"
        min="0"
        max={`${isCone ? 4 : 6}`}
        value={coneRank}
        onChange={(e) => onRankChange(Number(e.target.value))}
      />
      <LabelsContainer>
        {Array.from({ length: isCone ? 5 : 7 }, (_, i) => (
          <Label key={i}>{`${isCone ? `S${i + 1}` : `E${i}`}`}</Label>
        ))}
      </LabelsContainer>
      <ButtonContainer>
        <Button onClick={() => setIsConeChangeRankOpen(false)}>Cancel</Button>
        <Button onClick={() => onRankChoose()}>Confirm</Button>
      </ButtonContainer>
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  background-color: #c48353;
  color: white;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  border: 1px solid #ffdb29;

  border-radius: 5px;

  position: absolute;
  top: 20%;
  left: 50%;

  z-index: 999;
`;

const StyledSlider = styled.input`
  width: 200px;
  margin: 10px 0;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #007bff;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-webkit-slider-runnable-track {
    height: 2px;
    background: #ddd;
    border-radius: 5px;
  }

  &:focus {
    outline: none;
  }
`;

const LabelsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin-top: 10px;
`;

const Label = styled.span`
  font-size: 14px;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
