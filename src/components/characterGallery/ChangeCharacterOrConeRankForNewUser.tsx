import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ChangeRankForCharacters } from "@/components/styled/userStyles";
import styled from "styled-components";

interface Props<T> {
  characterId: string;
  newRank: number;
  newLevel: number | undefined;
  setCharactersForUser: Dispatch<SetStateAction<T[]>>;
}

export const ChangeCharacterOrConeRankAndLevelForNewUser = <
  T extends { id: string },
>({
  characterId,
  newRank,
  newLevel,
  setCharactersForUser,
}: Props<T>) => {
  const onCharacterRankChange = (characterId: string, newRank: number) => {
    setCharactersForUser((prevState) =>
      prevState.map((character) =>
        character.id === characterId
          ? { ...character, rank: newRank }
          : character,
      ),
    );
  };

  const onCharacterLevelChange = (characterId: string, newLevel: number) => {
    setCharactersForUser((prevState) =>
      prevState.map((character) =>
        character.id === characterId
          ? { ...character, level: newLevel }
          : character,
      ),
    );
  };

  const changeRank = (e: ChangeEvent<HTMLInputElement>) => {
    const rank = parseInt(e.target.value);
    onCharacterRankChange(characterId, rank);
  };

  const changeLevel = (e: ChangeEvent<HTMLInputElement>) => {
    const level = parseInt(e.target.value);
    onCharacterLevelChange(characterId, level);
  };

  return (
    <StyledChangeRankAndLevelContainer>
      <ChangeRankForCharacters
        value={newRank}
        type="number"
        onChange={changeRank}
        min={0}
        max={6}
      />

      <ChangeRankForCharacters
        value={newLevel}
        type="number"
        onChange={changeLevel}
        min={1}
        max={80}
      />
    </StyledChangeRankAndLevelContainer>
  );
};

const StyledChangeRankAndLevelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
