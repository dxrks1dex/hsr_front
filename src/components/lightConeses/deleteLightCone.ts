import { Dispatch, SetStateAction } from "react";
import { CharacterData } from "@/types/interface";

interface Props {
  setCharactersForUser: Dispatch<SetStateAction<CharacterData[]>>;
  characterId: string;
}

export const deleteLightCone = ({
  characterId,
  setCharactersForUser,
}: Props) => {
  setCharactersForUser((prevState) =>
    prevState.map((character) =>
      character.id === characterId
        ? {
            ...character,
            lightCone: undefined,
          }
        : character,
    ),
  );
};
