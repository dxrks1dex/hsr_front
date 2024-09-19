"use client";

import { RegUser } from "@/components/searchUser/regUser/RegUser";
import React, { ReactElement } from "react";
import UsersPageLayout from "@/app/userOperations/layout";
import { useLoginDataContext } from "@/context/useLoginDataContext";
import { LoginButton } from "@/components/login/LoginButton";

const UserPage = () => {
  const {
    data: { isAuthenticated },
  } = useLoginDataContext();

  return <div>{isAuthenticated ? <RegUser /> : <LoginButton />}</div>;
};

export default UserPage;

UserPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <UsersPageLayout>
      <div>{page}</div>
    </UsersPageLayout>
  );
};
