"use client";

import { FirstTeam } from "@/components/searchUser/user/FirstTeam";
import { SecondUser } from "@/components/banAndPick/pick-and-ban/users/SecondUser";
import { FirstUser } from "@/components/banAndPick/pick-and-ban/users/FirstUser";
import { useCharactersContext } from "@/context/useCharactersContext";
import styled from "styled-components";
import backgroundImage from "@/pic/bgimage.png";

import {
  subscribeOnPickAndBanUpdates,
  unsubscribeFromUpdates,
} from "@/fetch/api/update/update";
import React, { useEffect } from "react";
import { useFetchPickAndBans, useGetAllPickAndBansById } from "@/fetch/fetch";
import { VerticalIndicator } from "@/components/VertecalArrow/VerticalIndicator";
import { useSearchParams } from "next/navigation";
import { LoadingAnimation } from "@/components/common/LoadingAnimation";

export const Output = () => {
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");
  const { data, isLoading, isError, refetch } =
    useGetAllPickAndBansById(gameId);

  const { data: testData, isLoading: testLoading } =
    useGetAllPickAndBansById(gameId);

  const {
    data: { globalStage },
  } = useCharactersContext();

  console.log("game id: ", gameId, "game data:", testData);

  useEffect(() => {
    const handleUpdate = () => {
      refetch();
    };

    const unsubscribe = subscribeOnPickAndBanUpdates(handleUpdate);

    return () => {
      unsubscribeFromUpdates();
    };
  }, [refetch]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const firstPlayer = data?.firstPlayer || {};
  const secondPlayer = data?.secondPlayer || {};
  const thirdPlayer = data?.thirdPlayer || {};
  const fourthPlayer = data?.fourthPlayer || {};

  return (
    <StyledUsersSection>
      <FirstUser
        firstUserData={firstPlayer}
        secondUserData={thirdPlayer}
        secondTeamForResetTimer={secondPlayer}
      />
      <VerticalIndicator gameId={gameId} />
      <SecondUser
        secondUserData={fourthPlayer}
        firstUserData={secondPlayer}
        firstTeamForResetTimer={firstPlayer}
      />

      {/*<VideoBackground src="/bg.mp4" autoPlay loop muted />*/}
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
  display: grid;
  grid-template-columns: 40% 10% 40%;
  grid-gap: 20px;

  //align-items: center;
  justify-content: center;

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
  position: absolute;
  color: snow;

  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);

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
