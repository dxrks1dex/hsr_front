import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { CharacterData, LightConeData } from "@/types/interface";
import styled from "styled-components";
import { ChangeRankForCharacters } from "@/components/styled/userStyles";
import { useOutsideDetect } from "@/utils/useOutsideDetect";
import { useMutation } from "react-query";
import { updateCharactersCost } from "@/fetch/api/characters";

interface Props<T> {
  characterItem: CharacterData | LightConeData;
  charactersFromDB: T[];
  setCharactersFromDB: Dispatch<SetStateAction<T[]>>;
}

export const ChangeCharacterCost = <T extends { id: string }>({
  charactersFromDB,
  setCharactersFromDB,
  characterItem,
}: Props<T>) => {
  const [firstConstCost, setFirstConstCost] = useState(0);
  const [secondConstCost, setSecondConstCost] = useState(0);
  const [thirdConstCost, setThirdConstCost] = useState(0);
  const [fourthConstCost, setFourthConstCost] = useState(0);
  const [fifthConstCost, setFifthConstCost] = useState(0);
  const [sixConstCost, setSixConstCost] = useState(0);

  const [isCharacterCostOpen, setIsCharacterCostOpen] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideDetect({ ref: wrapperRef, setIsOpen: setIsCharacterCostOpen });

  const characterItemRef = useRef(characterItem);
  characterItemRef.current = characterItem;

  const onChangeCost = (id: string, newCost: string) => {
    const updatedCharacters = charactersFromDB.map((character) =>
      character.id === id ? { ...character, cost: Number(newCost) } : character,
    );
    setCharactersFromDB(updatedCharacters);
  };

  const onChangeRankCost = ({ id }: { id: string }) => {
    const updatedCharacters = charactersFromDB.map((character) =>
      character.id === id
        ? {
            ...character,
            rankCost: [
              firstConstCost,
              secondConstCost,
              thirdConstCost,
              fourthConstCost,
              fifthConstCost,
              sixConstCost,
            ],
          }
        : character,
    );
    setCharactersFromDB(updatedCharacters);

    console.log(updatedCharacters);
  };

  useEffect(() => {
    if (characterItemRef.current.rankCost) {
      setFirstConstCost(characterItemRef.current.rankCost[0]);
      setSecondConstCost(characterItemRef.current.rankCost[1]);
      setThirdConstCost(characterItemRef.current.rankCost[2]);
      setFourthConstCost(characterItemRef.current.rankCost[3]);
      setFifthConstCost(characterItemRef.current.rankCost[4]);
      setSixConstCost(characterItemRef.current.rankCost[5]);
    }
  }, []);

  useEffect(() => {
    onChangeRankCost({ id: characterItem.id });
  }, [
    firstConstCost,
    secondConstCost,
    thirdConstCost,
    fourthConstCost,
    fifthConstCost,
    sixConstCost,
    onChangeRankCost,
    characterItem.id,
  ]);

  return (
    <div>
      <div>Current cost: {characterItem.cost}</div>
      <div>
        {characterItem?.rankCost?.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <StyledChangeCharactersCostButton
        onClick={() => setIsCharacterCostOpen((prevState) => !prevState)}
      >
        Change cone cost
      </StyledChangeCharactersCostButton>
      {isCharacterCostOpen && (
        <div>
          <StyledCharactersCostInput
            placeholder="default cost"
            type="number"
            onChange={(e) => onChangeCost(characterItem.id, e.target.value)}
          />
          <StyledCharactersCostInput
            placeholder="first const cost"
            type="number"
            onChange={(e) => {
              setFirstConstCost(Number(e.target.value));
              onChangeRankCost({ id: characterItem.id });
            }}
          />
          <StyledCharactersCostInput
            placeholder="second const cost"
            type="number"
            onChange={(e) => setSecondConstCost(Number(e.target.value))}
          />
          <StyledCharactersCostInput
            placeholder="third const cost"
            type="number"
            onChange={(e) => setThirdConstCost(Number(e.target.value))}
          />
          <StyledCharactersCostInput
            placeholder="fourth const cost"
            type="number"
            onChange={(e) => setFourthConstCost(Number(e.target.value))}
          />
          <StyledCharactersCostInput
            placeholder="fifth const cost"
            type="number"
            onChange={(e) => setFifthConstCost(Number(e.target.value))}
          />
          <StyledCharactersCostInput
            placeholder="six const cost"
            type="number"
            onChange={(e) => setSixConstCost(Number(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

const StyledChangeCostDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledChangeCharactersCostButton = styled.button`
  border-radius: 5px;

  color: snow;
  background-color: #2d3861;

  border-color: #2d3861;

  padding: 2px;

  &:hover {
    transition: border-color 0.4s;
    border-color: #292953;
  }
`;

const StyledCharactersCostInput = styled.input`
  //background-color: #ad99f4;

  //position: absolute;

  margin-top: 5%;
  margin-left: 5%;

  width: 40px;

  color: black;
`;
