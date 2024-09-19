"use client";
import { SearchUser } from "@/components/searchUser/SearchUser";
import { useLoginDataContext } from "@/context/useLoginDataContext";
import { LoginButton } from "@/components/login/LoginButton";

const UserPage = () => {
  const {
    data: { isAuthenticated },
  } = useLoginDataContext();

  return <div>{isAuthenticated ? <SearchUser /> : <LoginButton />}</div>;
};

export default UserPage;
