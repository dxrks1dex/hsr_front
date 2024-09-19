"use client";
import { useLoginDataContext } from "@/context/useLoginDataContext";
import { useMutation } from "react-query";
import { fetchLoginData, onLogin } from "@/fetch/api/login";
import styled from "styled-components";

export const LoginButton = () => {
  const {
    data: { adminName, adminPassword, isAuthenticated, token },
    operations: {
      setIsAuthenticated,
      setAdminPassword,
      setToken,
      setAdminName,
    },
  } = useLoginDataContext();

  const { mutate, isLoading, error } = useMutation(onLogin);

  const logIn = () => {
    mutate(
      {
        username: adminName,
        password: adminPassword,
        setAuthenticated: setIsAuthenticated,
        setToken,
      },
      {
        onSuccess: async () => {
          console.log("success");
          await fetchLoginData({ token });
        },
        onError: () => {
          console.log("error of update user");
        },
      },
    );
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <StyledLoginContainer className="container mx-auto text-white flex justify-center flex-col h-screen">
      <div className="mx-auto">
        <div className="flex justify-center flex-col">
          {isAuthenticated ? null : (
          <div className="mx-auto flex flex-col text-sm text-gray-500 space-y-2 my-5">
            <p>Please Sign in</p>
            <input type="text" placeholder="login" className="px-3 py-1 bg-gray-600 text-white rounded-md" onChange={(e)=> setAdminName(e.target.value)} />
            <input type="password" placeholder="password" className="px-3 py-1 bg-gray-600 text-white rounded-md" onChange={(e)=> setAdminPassword(e.target.value)} />
          </div>
          )}
          <div className="mx-auto space-x-2">
          <button className="bg-green-700 rounded-md px-3 py-1 hover:bg-green-800 duration-300" onClick={()=> logIn()}>Sign in</button>
          <button className="bg-red-700 rounded-md px-3 py-1 hover:bg-red-800 duration-300" onClick={()=> logout()}>Log out</button>
          </div>
        </div>
      </div>
    </StyledLoginContainer>
  );
};

const StyledLoginContainer = styled.div`

`;

const StyledLoginSpan = styled.span`

`;
