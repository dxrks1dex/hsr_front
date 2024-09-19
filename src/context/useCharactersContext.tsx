"use client";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { CharacterData } from "@/types/interface";

interface ICharactersContext {
  data: {
    charactersFromDB: CharacterData[];
    charactersForUser: CharacterData[];
    firstPlayerBannedCharacters: CharacterData[];
    firstPlayerPickedCharacters: CharacterData[];
    firstPlayerFilteredCharacters: CharacterData[];
    isFirstPlayerBanOrPick: boolean;
    isSecondPlayerBanOrPick: boolean;
    firstPlayerTotalCost: number;
    secondPlayerTotalCost: number;
    globalStage: "ban" | "pick" | "ended" | null;

    secondPlayerBannedCharacters: CharacterData[];
    secondPlayerPickedCharacters: CharacterData[];
    secondPlayerFilteredCharacters: CharacterData[];

    thirdPlayerFilteredCharacters: CharacterData[];
    fourthPlayerFilteredCharacters: CharacterData[];
  };
  operations: {
    setCharactersFromDB: Dispatch<SetStateAction<CharacterData[]>>;
    setCharactersForUser: Dispatch<SetStateAction<CharacterData[]>>;
    setFirstPlayerBannedCharacters: Dispatch<SetStateAction<CharacterData[]>>;
    setFirstPlayerPickedCharacters: Dispatch<SetStateAction<CharacterData[]>>;
    setFirstPlayerFilteredCharacters: Dispatch<SetStateAction<CharacterData[]>>;
    setIsFirstPlayerBanOrPick: Dispatch<SetStateAction<boolean>>;
    setFirstPlayerTotalCost: Dispatch<SetStateAction<number>>;
    setSecondPlayerBannedCharacters: Dispatch<SetStateAction<CharacterData[]>>;
    setSecondPlayerPickedCharacters: Dispatch<SetStateAction<CharacterData[]>>;
    setIsSecondPlayerBanOrPick: Dispatch<SetStateAction<boolean>>;
    setSecondPlayerTotalCost: Dispatch<SetStateAction<number>>;
    setSecondPlayerFilteredCharacters: Dispatch<
      SetStateAction<CharacterData[]>
    >;
    setThirdPlayerFilteredCharacters: Dispatch<SetStateAction<CharacterData[]>>;
    setFourthPlayerFilteredCharacters: Dispatch<
      SetStateAction<CharacterData[]>
    >;

    setGlobalStage: Dispatch<SetStateAction<"ban" | "pick" | "ended" | null>>;

    firstPlayerPickOrBan: (isStarted: boolean) => void;
    secondPlayerPickOrBan: (isStarted: boolean) => void;
  };
}

const Characters = createContext<ICharactersContext | null>(null);
export const CharactersContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [charactersFromDB, setCharactersFromDB] = useState<CharacterData[]>([]);
  const [charactersForUser, setCharactersForUser] = useState<CharacterData[]>(
    [],
  );

  const [firstPlayerTotalCost, setFirstPlayerTotalCost] = useState(0);
  const [secondPlayerTotalCost, setSecondPlayerTotalCost] = useState(0);

  const [firstPlayerBannedCharacters, setFirstPlayerBannedCharacters] =
    useState<CharacterData[]>([]);
  const [firstPlayerPickedCharacters, setFirstPlayerPickedCharacters] =
    useState<CharacterData[]>([]);

  const [secondPlayerBannedCharacters, setSecondPlayerBannedCharacters] =
    useState<CharacterData[]>([]);
  const [secondPlayerPickedCharacters, setSecondPlayerPickedCharacters] =
    useState<CharacterData[]>([]);

  const [isFirstPlayerBanOrPick, setIsFirstPlayerBanOrPick] = useState(false);
  const [isSecondPlayerBanOrPick, setIsSecondPlayerBanOrPick] = useState(false);

  const [firstPlayerFilteredCharacters, setFirstPlayerFilteredCharacters] =
    useState<CharacterData[]>([]);
  const [secondPlayerFilteredCharacters, setSecondPlayerFilteredCharacters] =
    useState<CharacterData[]>([]);
  const [thirdPlayerFilteredCharacters, setThirdPlayerFilteredCharacters] =
    useState<CharacterData[]>([]);
  const [fourthPlayerFilteredCharacters, setFourthPlayerFilteredCharacters] =
    useState<CharacterData[]>([]);

  const [globalStage, setGlobalStage] = useState<
    "ban" | "pick" | "ended" | null
  >(null);

  const firstPlayerPickOrBan = (isStarted: boolean) => {
    setIsFirstPlayerBanOrPick(isStarted);
  };

  const secondPlayerPickOrBan = (isStarted: boolean) => {
    setIsSecondPlayerBanOrPick(isStarted);
  };

  const context: ICharactersContext = useMemo(
    () => ({
      data: {
        firstPlayerBannedCharacters,
        firstPlayerPickedCharacters,
        firstPlayerFilteredCharacters,
        isFirstPlayerBanOrPick,
        firstPlayerTotalCost,
        secondPlayerBannedCharacters,
        secondPlayerPickedCharacters,
        secondPlayerFilteredCharacters,
        isSecondPlayerBanOrPick,
        secondPlayerTotalCost,
        charactersFromDB,
        charactersForUser,
        globalStage,
        thirdPlayerFilteredCharacters,
        fourthPlayerFilteredCharacters,
      },
      operations: {
        setCharactersFromDB,
        setCharactersForUser,
        setFirstPlayerPickedCharacters,
        setFirstPlayerBannedCharacters,
        setIsFirstPlayerBanOrPick,
        setFirstPlayerFilteredCharacters,
        setFirstPlayerTotalCost,
        firstPlayerPickOrBan,
        setSecondPlayerBannedCharacters,
        setSecondPlayerPickedCharacters,
        setIsSecondPlayerBanOrPick,
        setSecondPlayerTotalCost,
        secondPlayerPickOrBan,
        setGlobalStage,
        setSecondPlayerFilteredCharacters,
        setFourthPlayerFilteredCharacters,
        setThirdPlayerFilteredCharacters,
      },
    }),
    [
      charactersForUser,
      charactersFromDB,
      firstPlayerBannedCharacters,
      firstPlayerFilteredCharacters,
      firstPlayerPickedCharacters,
      firstPlayerTotalCost,
      globalStage,
      isFirstPlayerBanOrPick,
      isSecondPlayerBanOrPick,
      secondPlayerBannedCharacters,
      secondPlayerFilteredCharacters,
      secondPlayerPickedCharacters,
      secondPlayerTotalCost,
    ],
  );

  return <Characters.Provider value={context}>{children}</Characters.Provider>;
};

export const useCharactersContext = (): ICharactersContext => {
  const value = useContext(Characters);
  if (value === null) {
    throw new Error("empty UseUserDataContext");
  }

  return value;
};
