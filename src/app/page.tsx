"use client";
import { MainPage } from "@/components/mainPage/MainPage";
import { useLoginDataContext } from "@/context/useLoginDataContext";
import { LoginButton } from "@/components/login/LoginButton";

export default function Home() {
  const {
    data: { isAuthenticated },
  } = useLoginDataContext();

  return <div>{isAuthenticated ? <MainPage /> : <LoginButton />}</div>;
}
