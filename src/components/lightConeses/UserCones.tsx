import React, {
  Dispatch,
  SetStateAction,
  useCallback,
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
  useFetchUserData,
} from "@/fetch/fetch";
import { ICON_DEFAULT_URL } from "@/utils/ICON_DEFAULT_URL";
import { CharacterData, LightConeData } from "@/types/interface";

import { calculateCost } from "@/utils/cost/calculateCost";
import { useCharactersContext } from "@/context/useCharactersContext";
import { useSearchParams } from "next/navigation";
import { charactersData } from "@/fetch/api/data/characterIdData";
import {
  CharacterCost,
  ConesForCharacters,
  RankForCharacters,
} from "@/styles/userStyles";
import { ChangeConeRank } from "@/components/lightConeses/ChangeConeRank";
import { addLightCone } from "@/components/lightConeses/addLightCone";

interface Props {
  characterId: string;
  currentPlayer: number;
  userUid: string | null;
  characterCone: LightConeData | undefined;
  updateDataForPlayers: () => Promise<void>;
  characterRank: number;

  setCharactersForUser: Dispatch<SetStateAction<CharacterData[]>>;
}

export const UserCones = ({
  characterId,
  setCharactersForUser,
  currentPlayer,
  userUid,
  characterCone,
  updateDataForPlayers,
  characterRank,
}: Props) => {
  const [isLightConesOpen, setIsLightConesOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [coneRank, setConeRank] = useState(0);
  const [isConeChangeRankOpen, setIsConeChangeRankOpen] = useState(false);
  const [selectedCone, setSelectedCone] = useState<LightConeData | null>(null);

  const { data, isLoading, error } = useFetchLightClones();

  const coneRankRef = useRef(coneRank);
  coneRankRef.current = coneRank;

  const wrapperRef = useRef(null);
  useOutsideDetect({ ref: wrapperRef, setIsOpen: setIsLightConesOpen });

  useEffect(() => {
    if (characterCone) setConeRank(characterCone?.rank);
  }, [characterCone]);

  useEffect(() => {
    if (selectedCone) {
      updateDataForPlayers();
      setIsLightConesOpen(false);
    }
  }, [selectedCone, updateDataForPlayers]);

  const onConesClicked = async (coneData: LightConeData) => {
    console.log("cone", coneData);

    addLightCone({ coneRank, coneData, setCharactersForUser, characterId });
    setSelectedCone(coneData);

    setIsLightConesOpen(false);
  };

  const onConeRankClick = () => {
    setIsConeChangeRankOpen(true);
  };

  const onRankChoose = () => {
    setIsConeChangeRankOpen(false);

    if (characterCone) {
      console.log(coneRank);

      addLightCone({
        coneRank,
        coneData: characterCone,
        setCharactersForUser,
        characterId,
      });

      setSelectedCone(characterCone);
    }
  };

  const onRankChange = (value: number) => {
    setConeRank(value);
  };

  if (isLoading) return <>Loading...</>;

  if (error) return <>An error has occurred: {(error as Error).message}</>;

  return (
    <div>
      {!characterCone ? (
        <StyledConeButton
          onClick={() => setIsLightConesOpen(true)}
          playerForStyle={currentPlayer}
        >
          +
        </StyledConeButton>
      ) : (
        <div>
          <StyledConeContainer>
            <StyledConeRankContainer
              onClick={() => onConeRankClick()}
              currentPlayer={currentPlayer}
            >
              S{characterCone.rank}
            </StyledConeRankContainer>
            <StyledCharacterCone
              playerForStyle={currentPlayer}
              onClick={() => setIsLightConesOpen(true)}
              src={`${ICON_DEFAULT_URL}/image/light_cone_portrait/${characterCone.id}.png`}
            />
            <StyledConeCost>
              {characterCone?.rank === 0
                ? characterCone?.cost
                : characterCone?.rankCost &&
                  characterCone?.rankCost[characterRank - 1]}
            </StyledConeCost>
          </StyledConeContainer>
        </div>
      )}

      {isConeChangeRankOpen && (
        <ChangeConeRank
          onRankChoose={onRankChoose}
          coneRank={coneRank}
          onRankChange={onRankChange}
          setIsConeChangeRankOpen={setIsConeChangeRankOpen}
        />
      )}
      <StyledChangeConeContainer>
        {isLightConesOpen ? (
          <StyledConesContainer
            currentPlayer={currentPlayer}
            className="bg-slate-700 p-2 text-white rounded-md flex flex-col absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto"
            ref={wrapperRef}
          >
            <input
              className="px-3 py-1 bg-gray-600 text-white rounded-md mb-5"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter by name"
            />
            {data
              .filter(
                (cone: LightConeData) =>
                  cone.name.toLowerCase().includes(filter.toLowerCase()) ||
                  cone?.secondName
                    ?.toLowerCase()
                    .includes(filter.toLowerCase()),
              )
              .map((coneData: LightConeData) => (
                <StyledConeCard
                  className="flex flex-row mb-1 bg-slate-600 rounded-md"
                  key={coneData.id}
                >
                  <StyledConeIcon
                    className="h-8"
                    src={`${ICON_DEFAULT_URL}/icon/light_cone/${coneData.id}.png`}
                  />
                  <StyledCones onClick={() => onConesClicked(coneData)}>
                    {coneData.name}
                  </StyledCones>
                </StyledConeCard>
              ))}
          </StyledConesContainer>
        ) : null}
      </StyledChangeConeContainer>
    </div>
  );
};

const StyledCharacterCone = styled(ConesForCharacters)<{
  playerForStyle: number;
}>`
  border-top-left-radius: ${({ playerForStyle }) =>
    playerForStyle === 1 && "10px"};
  border-top-right-radius: ${({ playerForStyle }) =>
    playerForStyle === 2 && "10px"};
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  border: 2px solid #fff;

  margin-top: 0;
  margin-right: 10px;

  width: 120px;
  height: 60px;

  //transform: translate(85%, -80%);

  box-shadow: 0 5px 45px rgba(0, 0, 150, 0.1);
`;

const RankForPickedOrBannedCharacters = styled(RankForCharacters)<{
  currentPlayer: number;
}>`
  position: absolute;

  z-index: 10;
  //margin-top: 3.9%;
  //margin-left: 0;

  transform: translate(580%, 100%);

  font-size: 20px;

  background-color: #000000;
  padding: 2px;
`;

const StyledConeButton = styled.button<{ playerForStyle: number }>`
  //transform: translate(380%, -60%);
  //width: 25px;
  border-top-left-radius: ${({ playerForStyle }) =>
    playerForStyle === 1 && "10px"};
  border-top-right-radius: ${({ playerForStyle }) =>
    playerForStyle === 2 && "10px"};
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  border: 2px solid #fff;

  margin-top: 0;
  margin-right: 10px;

  width: 120px;
  height: 60px;

  //transform: translate(85%, -80%);

  box-shadow: 0 5px 45px rgba(0, 0, 150, 0.1);
`;

const StyledConeRankContainer = styled(RankForPickedOrBannedCharacters)`
  transform: translate(200%, 80%);

  font-size: 18px;
`;

const StyledConeContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const StyledConeCard = styled.div``;

const StyledChangeConeContainer = styled.div``;

const StyledCones = styled.button``;

const StyledConesContainer = styled.section<{
  currentPlayer: number;
}>`
  z-index: 20;

  //top: ${(props) => (props.currentPlayer === 1 ? "10px" : "-250px")};

  height: 300px;

  overflow: hidden;
  &:hover {
    transition: 0.4s;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 12px;
      border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #4b5563;
      border-radius: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: #334155;
    }
  }
`;

const StyledConeIcon = styled.img``;

// const StyledConeButton = styled.button`
//   transform: translate(380%, -60%);
//   width: 25px;
//   height: 25px;
// `;
//
// const StyledConeCard = styled.div`
//   display: flex;
//
//   gap: 5px;
//
//   margin-top: 10px;
//   margin-bottom: 10px;
//   margin-right: 10px;
// `;
//
// const StyledConeContainer = styled.div`
//   //position: absolute;
// `;
//
// const StyledCones = styled.button`
//   border-radius: 5px;
//   border-color: #43274f;
//
//   color: #9fadbd;
//   background-color: #2d3861;
// `;
//
// const StyledConesContainer = styled.section`
//   //max-height: 30rem;
//   ////width: 20%;
//   //
//   ////width: 200%;
//   //z-index: 9999;
//   //
//   //left: 40%;
//   //top: -70%;
//   //
//   //position: absolute;
//   //
//   //overflow: hidden;
//   //&:hover {
//   //  transition: 0.4s;
//   //  overflow-y: scroll;
//   //
//   //  &::-webkit-scrollbar {
//   //    width: 12px;
//   //    border-radius: 6px;
//   //  }
//   //
//   //  &::-webkit-scrollbar-thumb {
//   //    background-color: #2d3861;
//   //    border-radius: 6px;
//   //  }
//   //
//   //  &::-webkit-scrollbar-track {
//   //    background-color: #0b1622;
//   //  }
//   //}
//   //
//   //border-radius: 5px;
//   //
//   //background-color: #0b1622;
//   //
//   //box-shadow: 0 5px 45px rgba(0, 0, 150, 0.1);
// `;
//
// const StyledConeIcon = styled.img`
//   //width: 30px;
//   //height: 30px;
//   //
//   //object-fit: cover;
// `;

const StyledConeCost = styled(CharacterCost)`
  background-color: #000000;
  padding: 2px;

  transform: translate(-200%, 10%);

  font-size: 18px;

  width: 24px;
`;
