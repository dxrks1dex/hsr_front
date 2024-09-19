"use client";
import React from "react";
import { getUser } from "@/fetch/api/users";
import { AddNewUser } from "@/fetch/userOperations/AddNewUser";
import { ChangeUserCharacters } from "@/fetch/userOperations/ChangeUserCharacters";
import { DeleteUser } from "@/fetch/userOperations/DeleteUser";
import { CharacterCollectionForAdding } from "@/components/characterGallery/CharacterCollectionForAdding";
import { StyledBgc } from "@/styles/userStyles";

export const RegUser = () => {
  const onUserGet = async (uid: string) => {
    return !!(await getUser(uid));
  };

  return (
    <StyledBgc style={{ color: "snow" }}>
      <DeleteUser />
      <CharacterCollectionForAdding />
    </StyledBgc>
  );
};
