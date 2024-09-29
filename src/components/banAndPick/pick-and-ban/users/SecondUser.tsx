import { CharacterData } from "@/types/interface";
import React, { useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useCharactersContext } from "@/context/useCharactersContext";
import { useUserDataContext } from "@/context/userDataContext";
import { usePickTimer } from "@/utils/timer/pickTimer";
import { useFetchTimer, useFetchUserData } from "@/fetch/fetch";
import { checkGlobalStage } from "@/utils/stage/checkGlobalStage";
import { isTimerStart } from "@/utils/timer/isTimerStart";
import { characterOperation } from "@/utils/pickOrBan/characterOperation";
import { createPickOrBansForSecondUser } from "@/fetch/api/pickAndBans";
import { calculateCost } from "@/utils/cost/calculateCost";
import { useOutsideDetect } from "@/utils/useOutsideDetect";
import {
  CharacterCost,
  CharacterImage,
  ConesForCharacters,
  GlobalButton,
  GlobalInput,
  MainTimerTextStyle,
  PenaltyTimerText,
  PlayerImage,
  PlayerInfo,
  PlayerInfoSection,
  PlayerInput,
  PlayerInputDiv,
  PlayerName,
  PlusSection,
  RankForCharacters,
  TeamDisplay,
  TimerSection,
} from "@/styles/userStyles";
import { ICON_DEFAULT_URL } from "@/utils/ICON_DEFAULT_URL";
import { BanAndPicks } from "@/components/banAndPick/BanAndPicks";
import styled from "styled-components";
import { BanAndPicksForOutput } from "@/components/banAndPick/pick-and-ban/banAndPicksForOutput/BanAndPicksForOutput";
import { useForProdContext } from "@/context/useForProdContext";
import { createDataForProd } from "@/fetch/api/forProd";
import { freeCharacter } from "@/common/freeCharacter";
import { CharactersDisplay } from "@/components/characterGallery/CharacterPlayerCard";
import { useTimerContext } from "@/context/useTimerContext";

interface Props {
  firstUserData: {
    characters: CharacterData[];
    picked: CharacterData[];
    banned: CharacterData[];
    firstCircleCount: number;
    secondCircleCount: number;
    deathCount: number;
    stage: "pick" | "ban" | null;
    uid: string | null;
    nickname: string;
  };
  secondUserData: {
    characters: CharacterData[];
    picked: CharacterData[];
    banned: CharacterData[];
    firstCircleCount: number;
    secondCircleCount: number;
    deathCount: number;
    stage: "pick" | "ban" | null;
    uid: string | null;
    nickname: string;
  };
  firstTeamForResetTimer: {
    characters: CharacterData[];
    picked: CharacterData[];
    banned: CharacterData[];
    firstCircleCount: number;
    secondCircleCount: number;
    deathCount: number;
    stage: "pick" | "ban" | null;
    uid: string | null;
    nickname: string;
  };
}
export const SecondUser = ({
  secondUserData,
  firstUserData,
  firstTeamForResetTimer,
}: Props) => {
  const [circlePenaltyColor, setCirclePenaltyColor] = useState("");
  const [stage, setStage] = useState<"ban" | "pick" | "ended">("ban");

  const [timer, setTimer] = useState(30);
  const [penaltyTimer, setPenaltyTimer] = useState(120);

  const {
    data: { mainTimer },
    operations: { resetMainTimer },
  } = useTimerContext();

  const {
    data: { isSecondPlayerBanOrPick, secondPlayerTotalCost, globalStage },
    operations: {
      secondPlayerPickOrBan,
      firstPlayerPickOrBan,
      setSecondPlayerTotalCost,
      setGlobalStage,
    },
  } = useCharactersContext();

  const {
    data: {
      currentPlayer,
      secondPlayerCirclePenalty,
      firstPlayerCirclePenalty,
    },
    operations: { setCurrentPlayer, setSecondPlayerCirclePenalty },
  } = useUserDataContext();

  const {
    data: { secondPlayerNickname, firstPlayerNickname },
    operations: { setSecondPlayerNickname },
  } = useForProdContext();

  const {
    data: timerData,
    isLoading: isTimerLoading,
    error: timerError,
  } = useFetchTimer();

  useEffect(() => {
    if (timerData && !isTimerLoading) {
      setTimer(timerData.mainTimer.minutes * 60 + timerData.mainTimer.seconds);
      setPenaltyTimer(
        timerData.penaltyTimer.minutes * 60 - timerData.penaltyTimer.seconds,
      );
    }
  }, [timerData, isTimerLoading]);

  const { totalTimer, currentTimer, timerReset } = usePickTimer({
    timer: mainTimer,
    setTimer,
    isPickStarted: isSecondPlayerBanOrPick,
    setPenaltyTimer,
    penaltyTimer,
    timerData,
  });

  const {
    data: dataFromDB,
    isLoading: isLoadingFromDB,
    error: dBError,
  } = useFetchUserData({
    uid: secondUserData.uid,
  });

  useEffect(() => {
    setGlobalStage(
      checkGlobalStage({
        firstPlayerPickedCharacters: firstTeamForResetTimer.picked,
        secondPlayerPickedCharacters: secondUserData.picked,
        secondPlayerBannedCharacters: secondUserData.banned,
        firstPlayerBannedCharacters: firstTeamForResetTimer.banned,
      }),
    );
  }, [
    firstTeamForResetTimer.banned,
    firstTeamForResetTimer.picked,
    secondUserData.banned,
    secondUserData.picked,
    setGlobalStage,
    stage,
  ]);

  useEffect(() => {
    isTimerStart({
      pickedCharactersSecondPlayer: secondUserData.picked,
      bannedCharactersSecondPlayer: secondUserData.banned,
      bannedCharactersFirstPlayer: firstTeamForResetTimer.banned,
      pickedCharactersFirstPlayer: firstTeamForResetTimer.picked,
      startPickOrBanForSecondPlayer: secondPlayerPickOrBan,
      startPickOrBanForFirstPlayer: firstPlayerPickOrBan,
      setCurrentPlayer: setCurrentPlayer,
    });
  }, [
    firstPlayerPickOrBan,
    firstTeamForResetTimer.banned,
    firstTeamForResetTimer.picked,
    secondPlayerPickOrBan,
    secondUserData.banned,
    secondUserData.picked,
    setCurrentPlayer,
  ]);

  useEffect(() => {
    resetMainTimer();
  }, [
    firstUserData.characters.length,
    resetMainTimer,
    firstTeamForResetTimer.characters.length,
  ]);

  useEffect(() => {
    if (secondUserData.picked.length === 4 && stage === "ban") {
      setStage("pick");
    }
  }, [secondUserData.picked, stage]);

  useEffect(() => {
    calculateCost({
      setTotalPickCost: setSecondPlayerTotalCost,
      playerPickedCharactersOrCones: secondUserData.picked,
    });
  }, [secondUserData.picked, setSecondPlayerTotalCost]);

  useEffect(() => {
    if (
      secondUserData.picked.length === 0 &&
      secondUserData.banned.length === 0
    ) {
      setSecondPlayerCirclePenalty(0);
      setCirclePenaltyColor("#fff");
    }
  }, [
    secondUserData.picked.length,
    secondUserData.banned.length,
    setSecondPlayerCirclePenalty,
  ]);

  // useEffect(() => {
  //   if (dataFromDB?.nickname) {
  //     createDataForProd({
  //       secondPlayerNickname: dataFromDB.nickname,
  //       secondPlayerPenaltyCircles: secondPlayerCirclePenalty,
  //     });
  //   }
  // }, [dataFromDB, secondPlayerCirclePenalty]);

  if (isLoadingFromDB) return <div>Loading...</div>;

  if (dBError) return <div> User not fount</div>;

  return (
    <div className="p-5 duration-300">
      <div className="HUMAN flex flex-row-reverse justify-between">
        <div>
          <TimerSection>
            <div className="self-end mb-1.5">
              total cost: {secondPlayerTotalCost}
            </div>

            <TimerSection>
              <div className="self-end mb-1.5 mr-1.5">reserve time</div>

              <div className="mt-1">
                <svg
                  width="15"
                  height="23"
                  viewBox="0 0 15 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.9487 0.135254H0V1.80599H2.19824V6.2467C2.19824 8.55762 3.6717 10.5244 5.73038 11.2588C3.6717 11.9932 2.19824 13.96 2.19824 16.2709V19.8322V20.7118H0V22.3825H14.9487V20.7118H12.8382V19.8322V16.2709C12.8382 13.96 11.3648 11.9932 9.30608 11.2588C11.3648 10.5244 12.8382 8.55762 12.8382 6.2467V1.80599H14.9487V0.135254ZM3.78105 16.2709V19.8322H11.2554V16.2709C11.2554 14.2069 9.58222 12.5337 7.51823 12.5337C5.45424 12.5337 3.78105 14.2069 3.78105 16.2709Z"
                    fill="white"
                  />
                </svg>
              </div>
              <MainTimerTextStyle>{totalTimer}</MainTimerTextStyle>
            </TimerSection>
            {/*<PenaltyTimerText className="text-white text-lg mt-5 font-bold">*/}
            {/*  Pick value: {secondPlayerTotalCost}*/}
            {/*</PenaltyTimerText>*/}
          </TimerSection>

          <TeamDisplay player={2}>
            <PlayerInfoSection currentPlayer={2}>
              <PlayerInfo>
                <PlayerName player={1}>
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="13.0128" cy="13.944" r="13.0128" fill="black" />
                  </svg>
                  <div>{firstUserData.nickname}</div>
                </PlayerName>
                <PlusSection>+</PlusSection>

                <PlayerName player={2}>
                  <div>{secondUserData.nickname}</div>
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="13.0128" cy="13.944" r="13.0128" fill="white" />
                  </svg>
                </PlayerName>
              </PlayerInfo>
            </PlayerInfoSection>
          </TeamDisplay>
          <div className="flex flex-row-reverse ">
            <CharactersDisplay
              // onCharacterClick={onCharacterClick}
              secondPlayerFilteredCharacters={firstUserData.characters}
              fourthPlayerFilteredCharacters={secondUserData.characters}
            />
          </div>
        </div>
        <StyledPlayerBanAndPick>
          <BanAndPicksForOutput
            isPickOrBan={isSecondPlayerBanOrPick}
            mainTimer={timer}
            userNickname={dataFromDB.nickname}
            currentPlayer={currentPlayer}
            currentStage={secondUserData.stage}
            globalStage={globalStage}
            currentPlayerForStyle={2}
            player={secondUserData}
          />
        </StyledPlayerBanAndPick>
      </div>
    </div>
  );
};

const StyledPlayerBanAndPick = styled.div`
  //position: absolute;
  //
  //left: 59.5%;
  //top: 5%;
  //
  //z-index: 1;

  margin-top: 10%;
`;

const StyledCircleInput = styled(GlobalInput)`
  height: 25px;
`;

const StyledCircleButton = styled(GlobalButton)`
  border: none;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 300ms;
  &:hover {
    width: 30px;
    scale: 1.1;
    border: none;
  }
`;

const ScreenOverlay = styled.div`
  position: fixed;
  bottom: 0;
  //left: 0;
  width: 40%;
  height: 224px;
  background: linear-gradient(to top, black, rgba(0, 0, 0, 0));
  pointer-events: none;
  z-index: 999;
`;
