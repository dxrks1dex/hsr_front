"use client";
import { PickedCharacters } from "@/components/banAndPick/pick-and-ban/users/PickedCharacters";
import { useLoginDataContext } from "@/context/useLoginDataContext";
import { LoginButton } from "@/components/login/LoginButton";

const OutPutPage = () => {
  const {
    data: { isAuthenticated },
  } = useLoginDataContext();
  return <>{isAuthenticated ? <PickedCharacters /> : <LoginButton />}</>;
};

export default OutPutPage;
