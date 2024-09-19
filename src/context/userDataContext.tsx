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

interface IUserDataContext {
  data: {
    userName: string;
    firstUserUid: string | null;
    secondUserUid: string | null;
    thirdUserUid: string | null;
    fourthUserUid: string | null;
    newUserUid: string;
    stage: "ban" | "pick";
    currentPlayer: number;
    firstPlayerCirclePenalty: number;
    secondPlayerCirclePenalty: number;
  };
  operations: {
    setUserName: Dispatch<SetStateAction<string>>;
    setNewUserUid: Dispatch<SetStateAction<string>>;
    setFirstUserUid: Dispatch<SetStateAction<string | null>>;
    setSecondUserUid: Dispatch<SetStateAction<string | null>>;
    setThirdUserUid: Dispatch<SetStateAction<string | null>>;
    setFourthUserUid: Dispatch<SetStateAction<string | null>>;
    setCurrentPlayer: Dispatch<SetStateAction<number>>;
    setFirstPlayerCirclePenalty: Dispatch<SetStateAction<number>>;
    setSecondPlayerCirclePenalty: Dispatch<SetStateAction<number>>;
    setStage: Dispatch<SetStateAction<"ban" | "pick">>;
  };
}

const UserData = createContext<IUserDataContext | null>(null);
export const UserDataContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userName, setUserName] = useState("");
  const [newUserUid, setNewUserUid] = useState("");

  const [firstUserUid, setFirstUserUid] = useState<string | null>(null);
  const [secondUserUid, setSecondUserUid] = useState<string | null>(null);
  const [thirdUserUid, setThirdUserUid] = useState<string | null>(null);
  const [fourthUserUid, setFourthUserUid] = useState<string | null>(null);

  const [stage, setStage] = useState<"ban" | "pick">("ban");

  const [currentPlayer, setCurrentPlayer] = useState(2);

  const [firstPlayerCirclePenalty, setFirstPlayerCirclePenalty] = useState(0);
  const [secondPlayerCirclePenalty, setSecondPlayerCirclePenalty] = useState(0);

  const context: IUserDataContext = useMemo(
    () => ({
      data: {
        userName,
        firstUserUid,
        secondUserUid,
        thirdUserUid,
        fourthUserUid,
        stage,
        newUserUid,
        currentPlayer,
        firstPlayerCirclePenalty,
        secondPlayerCirclePenalty,
      },
      operations: {
        setFirstUserUid,
        setSecondUserUid,
        setThirdUserUid,
        setFourthUserUid,
        setUserName,
        setStage,
        setNewUserUid,
        setCurrentPlayer,
        setFirstPlayerCirclePenalty,
        setSecondPlayerCirclePenalty,
      },
    }),
    [
      userName,
      firstUserUid,
      secondUserUid,
      stage,
      newUserUid,
      currentPlayer,
      firstPlayerCirclePenalty,
      secondPlayerCirclePenalty,
    ],
  );

  return <UserData.Provider value={context}>{children}</UserData.Provider>;
};

export const useUserDataContext = (): IUserDataContext => {
  const value = useContext(UserData);
  if (value === null) {
    throw new Error("empty UseUserDataContext");
  }

  return value;
};
