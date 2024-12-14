import styled from "styled-components";
import React, { useEffect } from "react";
import { CharacterData } from "@/types/interface";
import {
  CharacterCost,
  CharacterImage,
  ConesForCharacters,
} from "@/styles/userStyles";
import { ICON_DEFAULT_URL } from "@/utils/ICON_DEFAULT_URL";
import legendaryImage from "@/pic/legendary_raity.jpg";
import epicImage from "@/pic/epic_rar.jpg";
import { freeCharacter } from "@/common/freeCharacter";
import { ensureFreeCharacterExists } from "@/fetch/api/characters";

interface ICharacterPlayerCard {
  character: CharacterData | undefined;
  secondPlayerRank: number;
  fourthPlayerRank: number;
  secondPlayerLevel: number | undefined;
  fourthPlayerLevel: number | undefined;
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
  secondPlayerLevel,
  fourthPlayerLevel,
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
          {secondPlayerRank !== -1 ? (
            <PlayerRank player={1}>
              <div>{`E${secondPlayerRank}`}</div>
            </PlayerRank>
          ) : (
            <EmptyPlayerSection player={1} />
          )}
          {fourthPlayerRank !== -1 ? (
            <PlayerRank player={2}>
              <div>{`E${fourthPlayerRank}`}</div>
            </PlayerRank>
          ) : (
            <EmptyPlayerSection player={2} />
          )}
        </RankWrapper>
        <CharacterImage
          characterRarity={character.rarity}
          src={
            character.id === "0"
              ? `${character?.icon}`
              : `${ICON_DEFAULT_URL}/${character?.icon}`
          }
          onClick={() => {
            fn && fn(character);
          }}
        />
        <LevelWrapper>
          {secondPlayerLevel !== undefined ? (
            <PlayerRank player={1}>
              <div>{`Lv${secondPlayerLevel}`}</div>
            </PlayerRank>
          ) : (
            <EmptyPlayerSection player={1} />
          )}
          {fourthPlayerLevel !== undefined ? (
            <PlayerRank player={2}>
              <div>{`Lv${fourthPlayerLevel}`}</div>
            </PlayerRank>
          ) : (
            <EmptyPlayerSection player={2} />
          )}
        </LevelWrapper>
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
    const secondPlayerRank = secondPlayerCharacter?.rank ?? -1;
    const fourthPlayerRank = fourthPlayerCharacter?.rank ?? -1;
    const secondPlayerLevel = secondPlayerCharacter?.level;
    const fourthPlayerLevel = fourthPlayerCharacter?.level;

    return {
      character,
      secondPlayerRank,
      fourthPlayerRank,
      secondPlayerLevel,
      fourthPlayerLevel,
    };
  });

  const freeCharacterCard = freeCharacter
    ? {
        character: freeCharacter,
        secondPlayerRank: -1,
        fourthPlayerRank: -1,
        secondPlayerLevel: undefined,
        fourthPlayerLevel: undefined,
      }
    : null;

  return (
    <CharacterGrid>
      {combinedCharacters
        .sort((a, b) => {
          const rarityA = a.character?.rarity ?? 0;
          const rarityB = b.character?.rarity ?? 0;

          const rankComparison = rarityB - rarityA;

          if (rankComparison === 0) {
            const elementA = a.character?.element ?? "";
            const elementB = b.character?.element ?? "";

            return elementA.localeCompare(elementB);
          }

          return rankComparison;
        })

        .map(
          (
            {
              character,
              secondPlayerRank,
              fourthPlayerRank,
              secondPlayerLevel,
              fourthPlayerLevel,
            },
            index,
          ) => (
            <CharacterPlayerCard
              key={character?.id}
              index={index}
              character={character}
              secondPlayerRank={secondPlayerRank}
              fourthPlayerRank={fourthPlayerRank}
              secondPlayerLevel={secondPlayerLevel}
              fourthPlayerLevel={fourthPlayerLevel}
              fn={onCharacterClick}
            />
          ),
        )}
      {freeCharacterCard && (
        <CharacterPlayerCard
          key={freeCharacterCard.character?.id}
          index={0}
          character={freeCharacterCard.character}
          secondPlayerRank={freeCharacterCard.secondPlayerRank}
          fourthPlayerRank={freeCharacterCard.fourthPlayerRank}
          secondPlayerLevel={freeCharacterCard.secondPlayerLevel}
          fourthPlayerLevel={freeCharacterCard.fourthPlayerLevel}
          fn={onCharacterClick}
        />
      )}
    </CharacterGrid>
  );
};

const LevelWrapper = styled.div`
  position: absolute;
  bottom: 3px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 3px;

  z-index: 92;

  font-weight: bold;
`;

const EmptyPlayerSection = styled.div<{ player: number }>`
  background-color: ${({ player }) =>
    player === 1 ? "rgba(0, 0, 0, 0.7)" : "white"};
  width: 30px; /* Опционально: подбираешь ширину под свои нужды */
  height: 18px; /* Опционально: подбираешь высоту */
  border-radius: 3px;

  opacity: 0;
`;

const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
  }

  //height: 200px;
`;

const RankWrapper = styled.div`
  position: absolute;
  top: 3px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 3px;

  z-index: 92;

  font-weight: bold;
`;

const PlayerRank = styled.div<{ player: number }>`
  background-color: ${({ player }) =>
    player === 1 ? "rgba(0, 0, 0, 255)" : "rgba(255, 255, 255, 255)"};
  color: ${({ player }) =>
    player === 1 ? "rgba(255, 255, 255, 255)" : "rgba(0, 0, 0, 255)"};
  font-size: 14px;
  padding: 1px 4px;
  border-radius: 3px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const CharacterCard = styled.div<{
  index: number | undefined;
  characterRarity: number;
}>`
  border-top-right-radius: 20px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  background-image: url(${({ characterRarity }) =>
    characterRarity === 5 ? legendaryImage.src : epicImage.src});

  z-index: 2;
`;
