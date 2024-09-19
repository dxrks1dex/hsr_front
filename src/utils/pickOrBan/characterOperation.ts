import { Dispatch, SetStateAction } from "react";
import { stageCharacterCounts } from "@/utils/pickOrBan/characterCountPeerStage";
import { CharacterData } from "@/types/interface";

interface Props {
  userCharacter: CharacterData;
  charactersOperation: CharacterData[];
  stage: "pick" | "ban" | null;
  maxCharactersArrLength: number;
  currentStage: "pick" | "ban";
  stageCount: number;
  currentPlayer: number;

  setStageCount: Dispatch<SetStateAction<number>>;
  setCharactersOperation: Dispatch<SetStateAction<CharacterData[]>>;
  setFirstPlayerFilteredCharacters: Dispatch<SetStateAction<CharacterData[]>>;
  setSecondPlayerFilteredCharacters: Dispatch<SetStateAction<CharacterData[]>>;
  setThirdPlayerFilteredCharacters: Dispatch<SetStateAction<CharacterData[]>>;
  setFourthPlayerFilteredCharacters: Dispatch<SetStateAction<CharacterData[]>>;
  setStage: Dispatch<SetStateAction<"ban" | "pick" | null>>;
}

export const characterOperation = ({
  userCharacter,
  setFirstPlayerFilteredCharacters,
  setSecondPlayerFilteredCharacters,
  setCharactersOperation,
  charactersOperation,
  setStage,
  stage,
  currentStage,
  maxCharactersArrLength,
  stageCount,
  setStageCount,
  currentPlayer,
  setThirdPlayerFilteredCharacters,
  setFourthPlayerFilteredCharacters,
}: Props) => {
  console.log("CHARACTER ID: ", userCharacter.id);

  if (stage === null) {
    return;
  }

  if (
    // charactersOperation.length < stageCharacterCounts[stage] &&
    stage === currentStage
  ) {
    setCharactersOperation((prevCharactersOperation) => [
      ...prevCharactersOperation,
      userCharacter,
    ]);

    setFirstPlayerFilteredCharacters((prevCharacters) => {
      let updatedCharacters = prevCharacters.filter(
        (character) => character.id !== userCharacter.id,
      );

      if (userCharacter.id === "8001") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8002");
      }
      if (userCharacter.id === "8002") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8001");
      }
      if (userCharacter.id === "8003") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8004");
      }
      if (userCharacter.id === "8004") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8003");
      }
      if (userCharacter.id === "8005") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8006");
      }
      if (userCharacter.id === "8006") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8005");
      }

      return updatedCharacters;
    });

    setSecondPlayerFilteredCharacters((prevCharacters) => {
      let updatedCharacters = prevCharacters.filter(
        (character) => character.id !== userCharacter.id,
      );

      if (userCharacter.id === "8001") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8002");
      }
      if (userCharacter.id === "8002") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8001");
      }
      if (userCharacter.id === "8003") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8004");
      }
      if (userCharacter.id === "8004") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8003");
      }
      if (userCharacter.id === "8005") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8006");
      }
      if (userCharacter.id === "8006") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8005");
      }

      return updatedCharacters;
    });

    setThirdPlayerFilteredCharacters((prevCharacters) => {
      let updatedCharacters = prevCharacters.filter(
        (character) => character.id !== userCharacter.id,
      );

      if (userCharacter.id === "8001") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8002");
      }
      if (userCharacter.id === "8002") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8001");
      }
      if (userCharacter.id === "8003") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8004");
      }
      if (userCharacter.id === "8004") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8003");
      }
      if (userCharacter.id === "8005") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8006");
      }
      if (userCharacter.id === "8006") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8005");
      }

      return updatedCharacters;
    });

    setFourthPlayerFilteredCharacters((prevCharacters) => {
      let updatedCharacters = prevCharacters.filter(
        (character) => character.id !== userCharacter.id,
      );

      if (userCharacter.id === "8001") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8002");
      }
      if (userCharacter.id === "8002") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8001");
      }
      if (userCharacter.id === "8003") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8004");
      }
      if (userCharacter.id === "8004") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8003");
      }
      if (userCharacter.id === "8005") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8006");
      }
      if (userCharacter.id === "8006") {
        updatedCharacters = updatedCharacters.filter((c) => c.id !== "8005");
      }

      return updatedCharacters;
    });

    setStageCount((prevState) => prevState + 1);

    if (stageCount + 1 === maxCharactersArrLength) {
      if (currentStage === "ban") {
        setStage("pick");
      } else {
        setStage("ban");
      }
      setStageCount(0);
    }
  } else {
    console.log("wrong");
  }
};
