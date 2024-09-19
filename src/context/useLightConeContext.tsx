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
import { CharacterData, LightConeData } from "@/types/interface";

interface ILightCones {
  data: {
    coneFromDB: LightConeData[];
    coneForUser: LightConeData[];
  };
  operations: {
    setConeFromDB: Dispatch<SetStateAction<LightConeData[]>>;
    setConeForUser: Dispatch<SetStateAction<LightConeData[]>>;
  };
}

const LightCones = createContext<ILightCones | null>(null);
export const LightConeContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [coneFromDB, setConeFromDB] = useState<LightConeData[]>([]);
  const [coneForUser, setConeForUser] = useState<LightConeData[]>([]);

  const context: ILightCones = useMemo(
    () => ({
      data: {
        coneFromDB,
        coneForUser,
      },
      operations: {
        setConeFromDB,
        setConeForUser,
      },
    }),
    [coneForUser, coneFromDB],
  );

  return <LightCones.Provider value={context}>{children}</LightCones.Provider>;
};

export const useLightConeContext = (): ILightCones => {
  const value = useContext(LightCones);
  if (value === null) {
    throw new Error("empty UseLightConeContext");
  }

  return value;
};
