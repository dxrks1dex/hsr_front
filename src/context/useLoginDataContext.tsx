"use client";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ILoginDataContext {
  data: {
    adminName: string;
    adminPassword: string;
    isAuthenticated: boolean;
    token: string;
  };
  operations: {
    setAdminName: Dispatch<SetStateAction<string>>;
    setAdminPassword: Dispatch<SetStateAction<string>>;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    setToken: Dispatch<SetStateAction<string>>;
  };
}

const LoginData = createContext<ILoginDataContext | null>(null);
export const LoginDataContextWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");

  const checkAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  };

  useEffect(() => {
    if (checkAuthenticated()) {
      setIsAuthenticated(true);
    }
  }, []);

  const context: ILoginDataContext = useMemo(
    () => ({
      data: {
        adminName,
        adminPassword,
        isAuthenticated,
        token,
      },
      operations: {
        setAdminName,
        setAdminPassword,
        setIsAuthenticated,
        setToken,
      },
    }),
    [adminName, adminPassword, isAuthenticated, token],
  );

  return <LoginData.Provider value={context}>{children}</LoginData.Provider>;
};

export const useLoginDataContext = (): ILoginDataContext => {
  const value = useContext(LoginData);
  if (value === null) {
    throw new Error("empty useLoginDataContext");
  }

  return value;
};
