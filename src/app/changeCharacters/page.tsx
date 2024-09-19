"use client";

import { CharactersCollection } from "@/components/characterGallery/CharactersCollection";
import { useLoginDataContext } from "@/context/useLoginDataContext";
import { SearchUser } from "@/components/searchUser/SearchUser";
import { LoginButton } from "@/components/login/LoginButton";

const ChangeCharacters = () => {
  const {
    data: { isAuthenticated },
  } = useLoginDataContext();

  return (
    <div>{isAuthenticated ? <CharactersCollection /> : <LoginButton />}</div>
  );
};

export default ChangeCharacters;
