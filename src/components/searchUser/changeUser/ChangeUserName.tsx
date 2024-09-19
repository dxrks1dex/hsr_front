import { changeUser, IUserData } from "@/fetch/api/users";
import { useMutation, useQueryClient } from "react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { GlobalInput } from "@/components/styled/userStyles";
import styled from "styled-components";

interface Props {
  userData: IUserData;
  newNickname: string;

  setNewNickname: Dispatch<SetStateAction<string>>;
}

export const ChangeUserName = ({
  userData,
  setNewNickname,
  newNickname,
}: Props) => {
  return (
    <StyledNameContainer>
      <GlobalInput
        team={1}
        value={newNickname}
        placeholder={"input new nickname"}
        onChange={(e) => setNewNickname(e.target.value)}
      />
      <StyledName style={{ color: "snow" }}>
        Current name: {userData.nickname}
      </StyledName>
    </StyledNameContainer>
  );
};

const StyledNameContainer = styled.div`
  margin-top: 2%;
  margin-bottom: 2%;

  display: flex;
  flex-direction: column;
`;

const StyledName = styled.span`
  color: snow;
  font-size: 20px;
`;
