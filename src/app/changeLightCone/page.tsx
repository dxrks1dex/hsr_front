"use client";

import { LightConesCollection } from "@/components/lightConeses/LightConesCollection";
import { useLoginDataContext } from "@/context/useLoginDataContext";
import { LoginButton } from "@/components/login/LoginButton";

const ChangeLightConePage = () => {
  const {
    data: { isAuthenticated },
  } = useLoginDataContext();

  return (
    <div>{isAuthenticated ? <LightConesCollection /> : <LoginButton />}</div>
  );
};

export default ChangeLightConePage;
