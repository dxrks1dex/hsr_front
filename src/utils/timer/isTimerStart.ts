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

  // switch (true) {
  //   case pickedCharactersSecondPlayer.length === 8:
  //     startPickOrBanForSecondPlayer(false);
  //     startPickOrBanForFirstPlayer(false);
  //     setCurrentPlayer(1);
  //     break;
  //
  //   case pickedCharactersFirstPlayer.length === 8:
  //     startPickOrBanForSecondPlayer(true);
  //     startPickOrBanForFirstPlayer(false);
  //     setCurrentPlayer(2);
  //     break;
  //
  //   case pickedCharactersSecondPlayer.length === 7:
  //     startPickOrBanForSecondPlayer(false);
  //     startPickOrBanForFirstPlayer(true);
  //     setCurrentPlayer(1);
  //     break;
  //
  //   case pickedCharactersFirstPlayer.length === 6:
  //     startPickOrBanForSecondPlayer(true);
  //     startPickOrBanForFirstPlayer(false);
  //     setCurrentPlayer(2);
  //     break;
  //
  //   case pickedCharactersSecondPlayer.length === 5:
  //     startPickOrBanForSecondPlayer(false);
  //     startPickOrBanForFirstPlayer(true);
  //     setCurrentPlayer(1);
  //     break;
  //
  //   case pickedCharactersFirstPlayer.length === 4:
  //     startPickOrBanForSecondPlayer(true);
  //     startPickOrBanForFirstPlayer(false);
  //     setCurrentPlayer(2);
  //     break;
  //
  //   case pickedCharactersSecondPlayer.length === 3:
  //     startPickOrBanForSecondPlayer(false);
  //     startPickOrBanForFirstPlayer(true);
  //     console.log("7 IF");
  //     setCurrentPlayer(1);
  //     break;
  //
  //   case bannedCharactersSecondPlayer.length === 2:
  //     startPickOrBanForSecondPlayer(true);
  //     startPickOrBanForFirstPlayer(false);
  //     console.log("6 IF");
  //     setCurrentPlayer(2);
  //     break;
  //
  //   case bannedCharactersFirstPlayer.length === 2:
  //     startPickOrBanForSecondPlayer(false);
  //     startPickOrBanForFirstPlayer(true);
  //     console.log("5 IF");
  //     setCurrentPlayer(1);
  //     break;
  //
  //   case pickedCharactersSecondPlayer.length === 2:
  //     startPickOrBanForSecondPlayer(false);
  //     startPickOrBanForFirstPlayer(true);
  //     console.log("4 IF");
  //     setCurrentPlayer(1);
  //     break;
  //
  //   case pickedCharactersFirstPlayer.length === 1:
  //     startPickOrBanForSecondPlayer(true);
  //     startPickOrBanForFirstPlayer(false);
  //     console.log("3 IF");
  //     setCurrentPlayer(2);
  //     break;
  //
  //   case bannedCharactersFirstPlayer.length === 1 &&
  //     pickedCharactersFirstPlayer.length < 1:
  //     startPickOrBanForSecondPlayer(false);
  //     startPickOrBanForFirstPlayer(true);
  //     console.log("2 IF");
  //     setCurrentPlayer(1);
  //     break;
  //
  //   case bannedCharactersSecondPlayer.length === 1 &&
  //     pickedCharactersFirstPlayer.length === 0:
  //     startPickOrBanForSecondPlayer(true);
  //     startPickOrBanForFirstPlayer(false);
  //     console.log("1 IF");
  //     setCurrentPlayer(2);
  //     break;
  //
  //   default:
  //     console.log("No matching case found.");
  //     break;
  // }

  // if (bannedCharactersSecondPlayer.length === 0 &&
  //     bannedCharactersFirstPlayer.length === 0) {
  //   startPickOrBanForSecondPlayer(true);
  //   startPickOrBanForFirstPlayer(false);
  //   console.log("0 IF");
  //
  //   setCurrentPlayer(2);
  // }

  if (
    bannedCharactersSecondPlayer.length === 1 &&
    pickedCharactersFirstPlayer.length === 0
  ) {
    startPickOrBanForSecondPlayer(true);
    startPickOrBanForFirstPlayer(false);
    console.log("1 IF");

    setCurrentPlayer(2);
  }

  if (
    bannedCharactersFirstPlayer.length === 1 &&
    pickedCharactersFirstPlayer.length < 1
  ) {
    startPickOrBanForSecondPlayer(false);
    startPickOrBanForFirstPlayer(true);

    console.log("2 IF - picked L: ", pickedCharactersFirstPlayer.length);
    setCurrentPlayer(1);
  }

  if (
    pickedCharactersFirstPlayer.length === 1 &&
    pickedCharactersSecondPlayer.length < 2
  ) {
    startPickOrBanForSecondPlayer(true);
    startPickOrBanForFirstPlayer(false);
    console.log("3 IF");

    setCurrentPlayer(2);
  }

  if (pickedCharactersSecondPlayer.length === 2) {
    startPickOrBanForSecondPlayer(false);
    startPickOrBanForFirstPlayer(true);
    console.log("4 IF ", pickedCharactersSecondPlayer.length, {
      pickedCharactersSecondPlayer,
      pickedCharactersFirstPlayer,
      bannedCharactersFirstPlayer,
      bannedCharactersSecondPlayer,
    });

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
    console.log("5 IF");

    setCurrentPlayer(1);
  }

  if (bannedCharactersSecondPlayer.length === 2) {
    startPickOrBanForSecondPlayer(true);
    startPickOrBanForFirstPlayer(false);
    console.log("6 IF");

    setCurrentPlayer(2);
  }

  if (pickedCharactersSecondPlayer.length === 3) {
    startPickOrBanForSecondPlayer(false);
    startPickOrBanForFirstPlayer(true);
    console.log("7 IF");

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
