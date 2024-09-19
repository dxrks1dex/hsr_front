import { CharacterData } from "@/types/interface";

interface Props {
  firstPlayerPickedCharacters: CharacterData[];
  secondPlayerPickedCharacters: CharacterData[];
  secondPlayerBannedCharacters: CharacterData[];
  firstPlayerBannedCharacters: CharacterData[];
}

export const checkGlobalStage = ({
  firstPlayerPickedCharacters,
  secondPlayerPickedCharacters,
  secondPlayerBannedCharacters,
  firstPlayerBannedCharacters,
}: Props) => {
  if (
    firstPlayerPickedCharacters.length + secondPlayerPickedCharacters.length ===
      16 &&
    firstPlayerBannedCharacters.length + secondPlayerBannedCharacters.length ===
      4
  ) {
    return "ended";
  }
  if (
    firstPlayerPickedCharacters.length + secondPlayerPickedCharacters.length ===
      4 &&
    firstPlayerBannedCharacters.length + secondPlayerBannedCharacters.length ===
      4
  ) {
    return "pick";
  }

  if (
    firstPlayerPickedCharacters.length + secondPlayerPickedCharacters.length ===
    4
  ) {
    return "ban";
  }

  if (
    firstPlayerBannedCharacters.length + secondPlayerBannedCharacters.length ===
    2
  ) {
    return "pick";
  }

  if (
    firstPlayerBannedCharacters.length + secondPlayerBannedCharacters.length ===
    4
  ) {
    return "pick";
  }

  if (firstPlayerBannedCharacters.length === 1) {
    return "ban";
  }

  return null;
};
