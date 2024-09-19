import { Dispatch, SetStateAction } from "react";
import { CharacterData } from "@/types/interface";

interface Props {
  pickedCharactersFirstPlayer: CharacterData[];
  pickedCharactersSecondPlayer: CharacterData[];

  bannedCharactersFirstPlayer: CharacterData[];
  bannedCharactersSecondPlayer: CharacterData[];

  startPickOrBanForFirstPlayer: (isStarted: boolean) => void;
  startPickOrBanForSecondPlayer: (isStarted: boolean) => void;

  setCurrentPlayer: Dispatch<SetStateAction<number>>;
}

export const isTimerStart = ({
  startPickOrBanForFirstPlayer,
  pickedCharactersFirstPlayer,
  bannedCharactersFirstPlayer,
  pickedCharactersSecondPlayer,
  startPickOrBanForSecondPlayer,
  bannedCharactersSecondPlayer,
  setCurrentPlayer,
}: Props) => {
  if (
    pickedCharactersFirstPlayer === undefined ||
    bannedCharactersFirstPlayer === undefined ||
    pickedCharactersSecondPlayer === undefined ||
    bannedCharactersSecondPlayer === undefined ||
    startPickOrBanForFirstPlayer === undefined ||
    startPickOrBanForSecondPlayer === undefined ||
    setCurrentPlayer === undefined
  ) {
    return;
  }

  if (bannedCharactersSecondPlayer.length === 1) {
    startPickOrBanForSecondPlayer(true);
    startPickOrBanForFirstPlayer(false);
    setCurrentPlayer(2);
  }

  if (bannedCharactersFirstPlayer.length === 1) {
    startPickOrBanForSecondPlayer(false);
    startPickOrBanForFirstPlayer(true);
    setCurrentPlayer(1);
  }

  if (pickedCharactersFirstPlayer.length === 1) {
    startPickOrBanForSecondPlayer(true);
    startPickOrBanForFirstPlayer(false);
    setCurrentPlayer(2);
  }

  if (pickedCharactersSecondPlayer.length === 2) {
    startPickOrBanForSecondPlayer(false);
    startPickOrBanForFirstPlayer(true);
    setCurrentPlayer(1);
  }

  // if (pickedCharactersFirstPlayer.length === 2) {
  //   startPickOrBanForSecondPlayer(true);
  //   startPickOrBanForFirstPlayer(false);
  //   setCurrentPlayer(2);
  // }

  if (bannedCharactersFirstPlayer.length === 2) {
    startPickOrBanForSecondPlayer(false);
    startPickOrBanForFirstPlayer(true);
    setCurrentPlayer(1);
  }

  if (bannedCharactersSecondPlayer.length === 2) {
    startPickOrBanForSecondPlayer(true);
    startPickOrBanForFirstPlayer(false);
    setCurrentPlayer(2);
  }

  if (pickedCharactersSecondPlayer.length === 3) {
    startPickOrBanForSecondPlayer(false);
    startPickOrBanForFirstPlayer(true);
    setCurrentPlayer(1);
  }

  if (pickedCharactersFirstPlayer.length === 4) {
    startPickOrBanForSecondPlayer(true);
    startPickOrBanForFirstPlayer(false);
    setCurrentPlayer(2);
  }

  if (pickedCharactersSecondPlayer.length === 5) {
    startPickOrBanForSecondPlayer(false);
    startPickOrBanForFirstPlayer(true);
    setCurrentPlayer(1);
  }

  if (pickedCharactersFirstPlayer.length === 6) {
    startPickOrBanForSecondPlayer(true);
    startPickOrBanForFirstPlayer(false);
    setCurrentPlayer(2);
  }

  if (pickedCharactersSecondPlayer.length === 7) {
    startPickOrBanForSecondPlayer(false);
    startPickOrBanForFirstPlayer(true);
    setCurrentPlayer(1);
  }

  if (pickedCharactersFirstPlayer.length === 8) {
    startPickOrBanForSecondPlayer(true);
    startPickOrBanForFirstPlayer(false);
    setCurrentPlayer(2);
  }

  if (pickedCharactersSecondPlayer.length === 8) {
    startPickOrBanForSecondPlayer(false);
    startPickOrBanForFirstPlayer(false);
    setCurrentPlayer(1);
  }
};

//import { Dispatch, SetStateAction } from "react";
// import { CharacterData } from "@/types/interface";
//
// interface Props {
//   pickedCharactersFirstPlayer: CharacterData[];
//   pickedCharactersSecondPlayer: CharacterData[];
//
//   bannedCharactersFirstPlayer: CharacterData[];
//   bannedCharactersSecondPlayer: CharacterData[];
//
//   startPickOrBanForFirstPlayer: (isStarted: boolean) => void;
//   startPickOrBanForSecondPlayer: (isStarted: boolean) => void;
//
//   setCurrentPlayer: Dispatch<SetStateAction<number>>;
// }
//
// export const isTimerStart = ({
//   startPickOrBanForFirstPlayer,
//   pickedCharactersFirstPlayer,
//   bannedCharactersFirstPlayer,
//   pickedCharactersSecondPlayer,
//   startPickOrBanForSecondPlayer,
//   bannedCharactersSecondPlayer,
//   setCurrentPlayer,
// }: Props) => {
//   if (
//     pickedCharactersFirstPlayer === undefined ||
//     bannedCharactersFirstPlayer === undefined ||
//     pickedCharactersSecondPlayer === undefined ||
//     bannedCharactersSecondPlayer === undefined ||
//     startPickOrBanForFirstPlayer === undefined ||
//     startPickOrBanForSecondPlayer === undefined ||
//     setCurrentPlayer === undefined
//   ) {
//     return;
//   }
//
//   if (bannedCharactersSecondPlayer.length === 1) {
//     startPickOrBanForSecondPlayer(true);
//     startPickOrBanForFirstPlayer(false);
//     setCurrentPlayer(2);
//   }
//
//   // if (bannedCharactersFirstPlayer.length === 1) {
//   //   startPickOrBanForSecondPlayer(false);
//   //   startPickOrBanForFirstPlayer(true);
//   //   setCurrentPlayer(1);
//   // }
//
//   if (pickedCharactersSecondPlayer.length === 1) {
//     startPickOrBanForSecondPlayer(false);
//     startPickOrBanForFirstPlayer(true);
//     setCurrentPlayer(1);
//   }
//
//   if (pickedCharactersFirstPlayer.length === 2) {
//     startPickOrBanForSecondPlayer(true);
//     startPickOrBanForFirstPlayer(false);
//     setCurrentPlayer(2);
//   }
//
//   // if (pickedCharactersSecondPlayer.length === 2) {
//   //   startPickOrBanForSecondPlayer(false);
//   //   startPickOrBanForFirstPlayer(true);
//   //   setCurrentPlayer(1);
//   // }
//
//   if (bannedCharactersSecondPlayer.length === 2) {
//     startPickOrBanForSecondPlayer(true);
//     startPickOrBanForFirstPlayer(false);
//     setCurrentPlayer(2);
//   }
//
//   if (bannedCharactersFirstPlayer.length === 2) {
//     startPickOrBanForSecondPlayer(false);
//     startPickOrBanForFirstPlayer(true);
//     setCurrentPlayer(1);
//   }
//
//   if (pickedCharactersFirstPlayer.length === 3) {
//     startPickOrBanForSecondPlayer(true);
//     startPickOrBanForFirstPlayer(false);
//     setCurrentPlayer(2);
//   }
//
//   if (pickedCharactersSecondPlayer.length === 4) {
//     startPickOrBanForSecondPlayer(false);
//     startPickOrBanForFirstPlayer(true);
//     setCurrentPlayer(1);
//   }
//
//   if (pickedCharactersFirstPlayer.length === 5) {
//     startPickOrBanForSecondPlayer(true);
//     startPickOrBanForFirstPlayer(false);
//     setCurrentPlayer(2);
//   }
//
//   if (pickedCharactersSecondPlayer.length === 6) {
//     startPickOrBanForSecondPlayer(false);
//     startPickOrBanForFirstPlayer(true);
//     setCurrentPlayer(1);
//   }
//
//   if (pickedCharactersFirstPlayer.length === 7) {
//     startPickOrBanForSecondPlayer(true);
//     startPickOrBanForFirstPlayer(false);
//     setCurrentPlayer(2);
//   }
//
//   if (pickedCharactersSecondPlayer.length === 8) {
//     startPickOrBanForSecondPlayer(false);
//     startPickOrBanForFirstPlayer(true);
//     setCurrentPlayer(1);
//   }
//
//   if (pickedCharactersFirstPlayer.length === 8) {
//     startPickOrBanForSecondPlayer(false);
//     startPickOrBanForFirstPlayer(false);
//     setCurrentPlayer(2);
//   }
// };
