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

interface IForProd {
  data: {
    firstPlayerNickname: undefined;
    secondPlayerNickname: undefined;
  };
  operations: {
    setFirstPlayerNickname: Dispatch<SetStateAction<undefined>>;
    setSecondPlayerNickname: Dispatch<SetStateAction<undefined>>;
  };
}

const ForProd = createContext<IForProd | null>(null);
export const ForProdContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [firstPlayerNickname, setFirstPlayerNickname] = useState();
  const [secondPlayerNickname, setSecondPlayerNickname] = useState();

  const context: IForProd = useMemo(
    () => ({
      data: {
        firstPlayerNickname,
        secondPlayerNickname,
      },
      operations: {
        setFirstPlayerNickname,
        setSecondPlayerNickname,
      },
    }),
    [firstPlayerNickname, secondPlayerNickname],
  );

  return <ForProd.Provider value={context}>{children}</ForProd.Provider>;
};

export const useForProdContext = (): IForProd => {
  const value = useContext(ForProd);
  if (value === null) {
    throw new Error("empty UseForProdContext");
  }

  return value;
};
