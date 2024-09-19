import { getCharacter } from "@/fetch/api/characters";
import { CharacterData } from "@/types/interface";
import { Dispatch, SetStateAction } from "react";

interface Props {
  character: CharacterData;
  characterForCost: CharacterData;

  setCharacterForCost: Dispatch<SetStateAction<CharacterData>>;
}

export const findCharacterById = async ({
  character,
  setCharacterForCost,
  characterForCost,
}: Props) => {
  setCharacterForCost(await getCharacter(character.id));

  return characterForCost;
};
