import { CharacterData } from "@/types/interface";
import styled from "styled-components";
import {
  CharacterCost,
  CharactersCard,
  RankForCharacters,
} from "@/styles/userStyles";
import { UserCones } from "@/components/lightConeses/UserCones";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ICON_DEFAULT_URL } from "@/utils/ICON_DEFAULT_URL";
import { freeCharacter } from "@/common/freeCharacter";
import { ChangeConeRank } from "@/components/lightConeses/ChangeConeRank";
import { addLightCone } from "@/components/lightConeses/addLightCone";
import { updateCharacterRank } from "@/components/characters/updateCharacterRank";

interface Props {
  character: CharacterData;
  setFilteredCharacters: Dispatch<SetStateAction<CharacterData[]>>;
  updateDataForPlayers: () => Promise<void>;
  playerForStyle: number;
  index: number;

  userUid: string | null;
}

export const CharacterCard = ({
  character,
  userUid,
  setFilteredCharacters,
  updateDataForPlayers,
  playerForStyle,
  index,
}: Props) => {
  const [isCharacterChangeRankOpen, setIsCharacterChangeRankOpen] =
    useState(false);

  const [characterRank, setCharacterRank] = useState(0);

  const [pendingCharacterId, setPendingCharacterId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (pendingCharacterId !== null) {
      updateDataForPlayers();
    }
  }, [pendingCharacterId, updateDataForPlayers]);

  const characterRankRef = useRef(characterRank);
  characterRankRef.current = characterRank;

  const onRankChoose = async () => {
    setIsCharacterChangeRankOpen(false);

    if (character) {
      console.log(characterRank);

      updateCharacterRank({
        characterRank,
        characterData: character,
        setCharactersForUser: setFilteredCharacters,
        characterId: character.id,
      });

      setPendingCharacterId(character.id);
    }
  };

  const onRankChange = (value: number) => {
    setCharacterRank(value);
  };

  const onCharacterRankClick = () => {
    setIsCharacterChangeRankOpen(true);
  };

  return (
    <StyledCharacterAndConeSection currentPlayerForStyled={playerForStyle}>
      {isCharacterChangeRankOpen && (
        <ChangeConeRank
          onRankChoose={onRankChoose}
          coneRank={characterRank}
          onRankChange={onRankChange}
          setIsConeChangeRankOpen={setIsCharacterChangeRankOpen}
        />
      )}
      {playerForStyle === 1 && (
        <UserCones
          characterRank={character.rank}
          updateDataForPlayers={updateDataForPlayers}
          characterCone={character?.lightCone}
          userUid={userUid}
          currentPlayer={playerForStyle}
          setCharactersForUser={setFilteredCharacters}
          characterId={character.id}
        />
      )}
      <StyledCharactersCard playerForStyle={playerForStyle} index={index}>
        <div>
          <RankForPickedOrBannedCharacters
            currentPlayer={1}
            onClick={() => onCharacterRankClick()}
          >
            E{character.rank}
          </RankForPickedOrBannedCharacters>
          <StyledCharacterCard
            playerForStyle={playerForStyle}
            characterRarity={character.rarity}
            src={`${ICON_DEFAULT_URL}/${character.icon}`}
            onError={(e) => (e.currentTarget.src = freeCharacter.icon)}
          />
          <StyledCharacterCost>
            {character.rank === 0
              ? character.cost
              : character.rankCost[character.rank - 1]}
          </StyledCharacterCost>
        </div>
      </StyledCharactersCard>
      {playerForStyle === 2 && (
        <UserCones
          characterRank={character.rank}
          updateDataForPlayers={updateDataForPlayers}
          characterCone={character?.lightCone}
          userUid={userUid}
          currentPlayer={playerForStyle}
          setCharactersForUser={setFilteredCharacters}
          characterId={character.id}
        />
      )}
    </StyledCharacterAndConeSection>
  );
};

const StyledCharactersCard = styled(CharactersCard)<{
  playerForStyle: number;
  index: number;
}>`
  display: flex;
  justify-content: space-between;
`;

const StyledCharacterAndConeSection = styled.div<{
  currentPlayerForStyled: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${({ currentPlayerForStyled }) =>
    currentPlayerForStyled === 1 ? "flex-end" : "flex-start"};
  position: relative;

  margin-bottom: 5px;
`;

const StyledCharacterDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const RankForPickedOrBannedCharacters = styled(RankForCharacters)<{
  currentPlayer: number;
}>`
  position: absolute;

  z-index: 81;
  //margin-top: 3.9%;
  //margin-left: 0;

  transform: translate(580%, 100%);

  font-size: 20px;

  background-color: #000000;
  padding: 2px;
`;

const StyledCharacterCard = styled.img<{
  playerForStyle: number;
  characterRarity: number;
}>`
  width: 139px;
  height: 70px;

  border-top-left-radius: ${({ playerForStyle }) =>
    playerForStyle === 2 && "10px"};
  border-top-right-radius: ${({ playerForStyle }) =>
    playerForStyle === 1 && "10px"};

  border: 2px solid #fff;

  // background-color: {(props) =>
  //   props.characterRarity === 4
  //     ? "rgba(128, 0, 128, 0.25)"
  //     : "rgba(207,181,59, 0.25)"};
  backdrop-filter: blur(12px);
  //
  //border-top-left-radius: 8px;
  //border-top-right-radius: 8px;

  // box-shadow: 0px 0px 5px 2px
  //   {(props) =>
  //     props.characterRarity === 4 ? "#54458560" : "rgba(207,181,59, 0.25)"};
`;

const StyledCharacterCost = styled(CharacterCost)`
  transform: translate(15%, -200%);

  font-size: 20px;

  background-color: #000000;
  padding: 2px;
`;
