import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { useOutsideDetect } from "@/utils/useOutsideDetect";
import { isElementOutOfPage } from "@/utils/dom/isElementOutOfPage";
import {
  useFetchLightClones,
  useFetchLightClonesForAddToDB,
} from "@/fetch/fetch";
import { ICON_DEFAULT_URL } from "@/utils/ICON_DEFAULT_URL";
import { CharacterData, LightConeData } from "@/types/interface";

import { calculateCost } from "@/utils/cost/calculateCost";
import { useCharactersContext } from "@/context/useCharactersContext";
import { useSearchParams } from "next/navigation";

interface Props {
  characterId: string;
  currentPlayer?: number;

  setCharactersForUser: Dispatch<SetStateAction<CharacterData[]>>;
}

export const ChangeCharacterLightCones = ({
  characterId,
  setCharactersForUser,
  currentPlayer,
}: Props) => {
  const [isLightConesOpen, setIsLightConesOpen] = useState(false);
  const [isElementOut, setIsElementOut] = useState(false);
  const [filter, setFilter] = useState("");

  const [pickedItems, setPickedItems] = useState<
    Record<string, { cost: number }>
  >({});

  const { data, isLoading, error } = useFetchLightClones();

  const {
    operations: { setFirstPlayerTotalCost, setSecondPlayerTotalCost },
  } = useCharactersContext();

  const {
    data: coneToAdd,
    isLoading: isConeToAdd,
    error: errorConeToAdd,
  } = useFetchLightClonesForAddToDB();

  const wrapperRef = useRef(null);
  useOutsideDetect({ ref: wrapperRef, setIsOpen: setIsLightConesOpen });

  useEffect(() => {
    setIsElementOut(
      isElementOutOfPage({
        elementRef: wrapperRef,
        isElementVisible: isLightConesOpen,
      }),
    );
  }, [isLightConesOpen]);

  const onConesClicked = (coneData: LightConeData) => {
    console.log(currentPlayer);

    setCharactersForUser((prevState) =>
      prevState.map((character) =>
        character.id === characterId
          ? {
              ...character,
              lightCone: {
                id: coneData.id,
                name: coneData.name,
                rarity: coneData.rarity,
                cost: coneData.cost,
                icon: coneData.icon,
                rank: coneData.rank,
                rankCost: coneData.rankCost,
              },
            }
          : character,
      ),
    );

    setIsLightConesOpen(false);
  };

  if (isLoading) return <>Loading...</>;

  if (error) return <>An error has occurred: {(error as Error).message}</>;

  return (
    <StyledConeContainer>
      <StyledConeButton onClick={() => setIsLightConesOpen(!isLightConesOpen)}>
        ❌
      </StyledConeButton>
      {isLightConesOpen ? (
        <StyledConesContainer ref={wrapperRef} isElementOut={isElementOut}>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by name"
          />
          {data
            .filter((cone: LightConeData) =>
              cone.name.toLowerCase().includes(filter.toLowerCase()),
            )
            .map((coneData: LightConeData) => (
              <StyledConeCard key={coneData.id}>
                <StyledConeIcon
                  src={`${ICON_DEFAULT_URL}/icon/light_cone/${coneData.id}.png`}
                />
                <StyledCones onClick={() => onConesClicked(coneData)}>
                  {coneData.name}
                </StyledCones>
              </StyledConeCard>
            ))}
        </StyledConesContainer>
      ) : null}
    </StyledConeContainer>
  );
};

const StyledConeButton = styled.button`
  border: 1px solid black;

  border-radius: 50px;

  background-color: rgba(253, 242, 255, 0.34);

  color: #2d3861;

  font-size: 9px;
  font-weight: 700;

  text-align: center;

  margin-bottom: 218%;
  margin-left: -103%;

  width: 25px;
  height: 25px;
`;

const StyledConeCard = styled.div`
  display: flex;

  gap: 5px;

  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

const StyledConeContainer = styled.div`
  position: absolute;
`;

const StyledCones = styled.button`
  border-radius: 5px;
  border-color: red;
`;

const StyledConesContainer = styled.section<{ isElementOut: boolean }>`
  max-height: 30rem;
  //width: 20%;

  //width: 200%;
  z-index: 9999;

  margin-left: ${(props) => (props.isElementOut ? "-22%" : "10%")};
  margin-top: -7%;

  position: absolute;

  overflow: hidden;
  &:hover {
    transition: 0.4s;
    overflow-y: scroll;
  }

  border-radius: 5px;

  background-color: #fff;

  box-shadow: 0 5px 45px rgba(0, 0, 150, 0.1);
`;

const StyledConeIcon = styled.img`
  width: 30px;
  height: 30px;

  object-fit: cover;
`;
