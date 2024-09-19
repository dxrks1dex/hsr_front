import styled from "styled-components";
import React from "react";
import { CharacterData } from "@/types/interface";
import {
  CharacterCost,
  CharacterImage,
  ConesForCharacters,
} from "@/styles/userStyles";
import { ICON_DEFAULT_URL } from "@/utils/ICON_DEFAULT_URL";
import legendaryImage from "@/pic/legendary_raity.jpg";
import epicImage from "@/pic/epic_rar.jpg";

interface ICharacterPlayerCard {
  character: CharacterData | undefined;
  secondPlayerRank: number;
  fourthPlayerRank: number;
  fn?: (character: CharacterData) => void;
  index?: number;
}

interface ICharactersDisplay {
  secondPlayerFilteredCharacters: CharacterData[];
  fourthPlayerFilteredCharacters: CharacterData[];
  onCharacterClick?: (character: CharacterData) => void;
}

export const CharacterPlayerCard = ({
  character,
  secondPlayerRank,
  fourthPlayerRank,
  fn,
  index,
}: ICharacterPlayerCard) => {
  if (character)
    return (
      <CharacterCard
        key={character?.id}
        index={index}
        characterRarity={character.rarity}
      >
        <RankWrapper>
          <PlayerRank player={1}>{`E${secondPlayerRank}`}</PlayerRank>
          <PlayerRank player={2}>{`E${fourthPlayerRank}`}</PlayerRank>
        </RankWrapper>
        <CharacterImage
          characterRarity={character.rarity}
          src={`${ICON_DEFAULT_URL}/${character?.icon}`}
          onClick={() => {
            fn && fn(character);
          }}
        />
      </CharacterCard>
    );
};

export const CharactersDisplay = ({
  secondPlayerFilteredCharacters,
  fourthPlayerFilteredCharacters,
  onCharacterClick,
}: ICharactersDisplay) => {
  const allCharacterIds = new Set([
    ...secondPlayerFilteredCharacters.map((char) => char.id),
    ...fourthPlayerFilteredCharacters.map((char) => char.id),
  ]);

  const combinedCharacters = Array.from(allCharacterIds).map((id) => {
    const secondPlayerCharacter = secondPlayerFilteredCharacters.find(
      (char) => char.id === id,
    );
    const fourthPlayerCharacter = fourthPlayerFilteredCharacters.find(
      (char) => char.id === id,
    );

    const character = secondPlayerCharacter || fourthPlayerCharacter;
    const secondPlayerRank = secondPlayerCharacter?.rank || 0;
    const fourthPlayerRank = fourthPlayerCharacter?.rank || 0;

    return { character, secondPlayerRank, fourthPlayerRank };
  });

  return (
    <CharacterGrid>
      {combinedCharacters
        .sort((a, b) => Number(b?.character?.id) - Number(a?.character?.id))
        .map(({ character, secondPlayerRank, fourthPlayerRank }, index) => (
          <CharacterPlayerCard
            key={character?.id}
            index={index}
            character={character}
            secondPlayerRank={secondPlayerRank}
            fourthPlayerRank={fourthPlayerRank}
            fn={onCharacterClick}
          />
        ))}
    </CharacterGrid>
  );
};

const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;

const RankWrapper = styled.div`
  position: absolute;
  top: 3px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 3px;

  z-index: 92;
`;

const PlayerRank = styled.div<{ player: number }>`
  background-color: ${({ player }) =>
    player === 1 ? "rgba(0, 0, 0, 0.7)" : "white"};
  color: ${({ player }) => (player === 1 ? "white" : "rgba(0, 0, 0, 0.7)")};
  font-size: 12px;
  padding: 1px 4px;
  border-radius: 3px;
`;

const CharacterCard = styled.div<{
  index: number | undefined;
  characterRarity: number;
}>`
  border-top-right-radius: 10px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  background-image: url(${({ characterRarity }) =>
    characterRarity === 5 ? legendaryImage.src : epicImage.src});
`;
