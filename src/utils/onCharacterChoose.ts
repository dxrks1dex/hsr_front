import { Dispatch, SetStateAction } from "react";
import { CharacterData } from "@/types/interface";

interface ICharacterData {
  [key: string]: {
    icon: string;
    Rarity?: number;
  };
}

interface Props {
  characterId: string;
  charactersFromDB: CharacterData[];
  charactersForUser: CharacterData[];

  setCharactersFromDB: Dispatch<SetStateAction<CharacterData[]>>;
  setCharactersForUser: Dispatch<SetStateAction<CharacterData[]>>;
}

export const onCharacterChoose = ({
  charactersFromDB,
  setCharactersFromDB,
  setCharactersForUser,
  charactersForUser,
  characterId,
}: Props) => {
  if (charactersForUser.some((char) => char.id === characterId)) {
    console.log("Character already chosen");
    return;
  }

  const selectedCharacter = charactersFromDB.find(
    (char) => char.id === characterId,
  );

  if (!selectedCharacter) {
    console.error("Character not found");
    return;
  }

  setCharactersForUser((prevState) => [...prevState, selectedCharacter]);

  const updatedCharacters = charactersFromDB.filter(
    (char) => char.id !== characterId,
  );
  setCharactersFromDB(updatedCharacters);
};
