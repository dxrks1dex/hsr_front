"use client";

import { useSearchParams } from "next/navigation";
import backgroundImage from "@/pic/bgimage.png";
import { SecondTeam } from "@/components/searchUser/user/SecondTeam";
import { useCharactersContext } from "@/context/useCharactersContext";
import styled from "styled-components";
import { FirstTeam } from "@/components/searchUser/user/FirstTeam";
import { useUserDataContext } from "@/context/userDataContext";
import { VerticalIndicator } from "@/components/VertecalArrow/VerticalIndicator";
import { ChangeTimer } from "@/utils/timer/ChangeTimer";
import React from "react";
export const SearchUser = () => {
  const {
    data: { globalStage },
  } = useCharactersContext();
  const {
    data: { currentPlayer },
  } = useUserDataContext();

  const searchParams = useSearchParams();
  const user1Uid = searchParams.get("user1");
  const user3Uid = searchParams.get("user3");
  const user2Uid = searchParams.get("user2");
  const user4Uid = searchParams.get("user4");

  return (
    <StyledUsersSection>
      <FirstTeam firstUid={user1Uid} secondUid={user3Uid} currentPlayer={1} />
      <VerticalIndicator currentPlayer={currentPlayer} />
      <SecondTeam firstUid={user2Uid} secondUid={user4Uid} currentPlayer={2} />
      {/*<VideoBackground src="/bg.mp4" autoPlay loop muted />*/}
      {/*  <ChangeTimer isPickStarted={isFirstPlayerBanOrPick} />*/}

      <ScreenOverlay />
    </StyledUsersSection>
  );
};

const ScreenOverlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 224px;
  background: linear-gradient(to top, black, rgba(0, 0, 0, 0));
  pointer-events: none;
  z-index: 999;
`;

const StyledUsersSection = styled.section`
  //position: relative;
  display: grid;
  grid-template-columns: 40% 10% 40%;
  grid-gap: 20px;

  //align-items: center;
  justify-content: center;

  // background-image: url(${backgroundImage.src});
  // background-repeat: no-repeat;
  // background-size: cover;
  // background-position: center;

  //height: 879px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(${backgroundImage.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(10px);
    z-index: -1;
  }
`;

const StageStyle = styled.span`
  //margin-top: 160%;

  color: snow;

  font-weight: 800;
  font-size: 40px;

  text-shadow: 2px 2px 10px #2d3861;
`;

const VideoBackground = styled.video`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  filter: grayscale(70%);

  z-index: -9;
`;
