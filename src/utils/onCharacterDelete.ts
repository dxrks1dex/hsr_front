import { Dispatch, SetStateAction } from "react";
import { CharacterData } from "@/types/interface";

interface Props<T> {
  characterId: string;
  charactersForUser: T[];

  setCharactersFromDB: Dispatch<SetStateAction<T[]>>;
  setCharactersForUser: Dispatch<SetStateAction<T[]>>;
}

export const onCharacterDelete = <T extends { id: string }>({
  setCharactersFromDB,
  setCharactersForUser,
  charactersForUser,
  characterId,
}: Props<T>) => {
  const index = charactersForUser.findIndex((char) => char.id === characterId);
  if (index === -1) {
    console.log("Character not found");
    return;
  }

  const deletedCharacter = charactersForUser[index];

  setCharactersForUser((prevState) =>
    prevState.filter((char) => char.id !== characterId),
  );

  setCharactersFromDB((prevCharacters) => [
    ...prevCharacters,
    deletedCharacter,
  ]);
};
