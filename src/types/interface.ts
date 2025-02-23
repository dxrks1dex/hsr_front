import { character } from "stylis";

export interface Player {
  uid: string;
  nickname: string;
  avatar: {
    id: string;
    name: string;
    icon: string;
  };
  characters: CharacterData[];
}

export interface CharacterData {
  id: string;
  level?: number;
  rarity: number;
  rank: number;
  icon: string;
  cost: number;
  element: string;
  rankCost: number[];
  lightCone?: LightConeData;
}
export interface LightConeData {
  id: string;
  name: string;
  secondName: string;
  rarity: number;
  cost: number;
  icon: string;
  rank: number;
  rankCost?: number[];
}

export interface User {
  player: Player;
  characters: CharacterData[];
  lightCones: LightConeData[];
}

export interface ISynergy {
  _id?: string;
  url: string;
  name: string;
  cost: number;
}
