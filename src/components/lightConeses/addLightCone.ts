import { Dispatch, SetStateAction } from "react";
import { CharacterData, LightConeData } from "@/types/interface";

interface Props {
  setCharactersForUser: Dispatch<SetStateAction<CharacterData[]>>;
  coneData: LightConeData;
  coneRank: number;
  characterId: string;
}

export const addLightCone = ({
  coneRank,
  coneData,
  characterId,
  setCharactersForUser,
}: Props) => {
  console.log("cone data:: ", coneData);

  setCharactersForUser((prevState) =>
    prevState.map((character) =>
      character.id === characterId
        ? {
            ...character,
            lightCone: {
              id: coneData.id,
              name: coneData.name,
              secondName: coneData.secondName,
              rarity: coneData.rarity,
              cost: coneData.cost,
              icon: coneData.icon,
              rank: coneRank,
              rankCost: coneData.rankCost,
            },
          }
        : character,
    ),
  );
};
