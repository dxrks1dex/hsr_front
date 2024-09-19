import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { CharacterData } from "@/types/interface";
import { ChangeRankForCharacters } from "@/components/styled/userStyles";

interface Props<T> {
  characterId: string;
  newRank: number;

  setCharactersForUser: Dispatch<SetStateAction<T[]>>;
}

export const ChangeCharacterOrConeRankForNewUser = <T extends { id: string }>({
  characterId,
  newRank,
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

  const changeRank = (e: ChangeEvent<HTMLInputElement>) => {
    const rank = parseInt(e.target.value);
    onCharacterRankChange(characterId, rank);
  };

  return (
    <ChangeRankForCharacters
      value={newRank}
      type="number"
      onChange={changeRank}
      min={0}
      max={6}
    />
  );
};
