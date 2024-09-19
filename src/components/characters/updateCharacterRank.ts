import { Dispatch, SetStateAction } from "react";
import { CharacterData } from "@/types/interface";

interface Props {
  setCharactersForUser: Dispatch<SetStateAction<CharacterData[]>>;
  characterData: CharacterData;
  characterRank: number;
  characterId: string;
}

export const updateCharacterRank = ({
  characterRank,
  characterData,
  characterId,
  setCharactersForUser,
}: Props) => {
  setCharactersForUser((prevState) =>
    prevState.map((character) =>
      character.id === characterId
        ? {
            ...character,
            rank: characterRank,
          }
        : character,
    ),
  );

  console.log("character data:: ", characterData);
};
