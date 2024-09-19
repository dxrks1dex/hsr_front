import { CharacterData, LightConeData } from "@/types/interface";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setTotalPickCost: Dispatch<SetStateAction<number>>;
  playerPickedCharactersOrCones: CharacterData[];
}

export const calculateCost = async ({
  playerPickedCharactersOrCones,
  setTotalPickCost,
}: Props) => {
  let totalCost = 0;

  playerPickedCharactersOrCones.forEach((character) => {
    let characterCost = character.cost;
    let characterRankCost = character.rankCost[character.rank - 1];

    if (character.rank === 0) {
      totalCost += characterCost;
    } else {
      totalCost += characterRankCost;
    }

    if (character?.lightCone?.rankCost) {
      let coneCost = character.lightCone?.cost;
      let coneRankCost =
        character.lightCone?.rankCost[character.lightCone.rank - 1];

      if (character?.lightCone?.rank === 0) {
        totalCost += coneCost;
      } else {
        totalCost += coneRankCost;
      }
    }

    console.log(totalCost);
  });

  setTotalPickCost(totalCost);
};
