import { CharacterData, ISynergy, LightConeData } from "@/types/interface";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setTotalPickCost: Dispatch<SetStateAction<number>>;
  playerPickedCharactersOrCones: CharacterData[];
  playerSynergys?: (ISynergy | null)[];
}

export const calculateCost = async ({
  playerPickedCharactersOrCones,
  setTotalPickCost,
  playerSynergys,
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
        character.lightCone?.rankCost[character.lightCone.rank];

      totalCost += coneRankCost;
    }

    console.log(totalCost);
  });

  if (playerSynergys) {
    setTotalPickCost(
      totalCost +
        playerSynergys.reduce((sum, item) => {
          if (item && item.cost !== undefined) {
            return sum + item.cost;
          }
          return sum;
        }, 0),
    );
  } else {
    setTotalPickCost(totalCost);
  }
};
