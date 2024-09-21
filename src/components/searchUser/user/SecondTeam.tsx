import { useFetchTimer, useFetchUserData } from "@/fetch/fetch";
import React, { useEffect, useRef, useState } from "react";
import {
  CharacterImage,
  CharactersContainer,
  PlayerInfo,
  PlayerName,
  PlayerSection,
  ConesForCharacters,
  RankForCharacters,
  MainTimerTextStyle,
  TimerSection,
  PlayerInfoSection,
  PlayerImage,
  PenaltyTimerText,
  GlobalInput,
  GlobalButton,
  PlayerInputDataContainer,
  PlayerInputDiv,
  PlayerInput,
  CharacterCost,
  TeamDisplay,
  PlusSection,
} from "@/styles/userStyles";

import { characterOperation } from "@/utils/pickOrBan/characterOperation";
import { ICON_DEFAULT_URL } from "@/utils/ICON_DEFAULT_URL";
import { usePickTimer } from "@/utils/timer/pickTimer";
import { isTimerStart } from "@/utils/timer/isTimerStart";
import { useCharactersContext } from "@/context/useCharactersContext";
import styled from "styled-components";
import { CharacterData } from "@/types/interface";
import { useUserDataContext } from "@/context/userDataContext";
import { checkGlobalStage } from "@/utils/stage/checkGlobalStage";
import { calculateCost } from "@/utils/cost/calculateCost";
import { useOutsideDetect } from "@/utils/useOutsideDetect";
import { BanAndPicks } from "@/components/banAndPick/BanAndPicks";
import {
  createPickOrBansForFirstUser,
  createPickOrBansForFourthUser,
  createPickOrBansForSecondUser,
} from "@/fetch/api/pickAndBans";
import { useQueryClient } from "react-query";
import { freeCharacter } from "@/common/freeCharacter";
import {
  CharacterPlayerCard,
  CharactersDisplay,
} from "@/components/characterGallery/CharacterPlayerCard";
import { getCharacter } from "@/fetch/api/characters";
import timerImage from "@/pic/Timer.png";
import { useRouter } from "next/navigation";

interface Props {
  firstUid: string | null;
  secondUid: string | null;

  currentPlayer: number;
}

export const SecondTeam = ({ firstUid, secondUid }: Props) => {
  const [isCircleOpen, setIsCircleOpen] = useState(false);
  const [firstCircleCount, setFirstCircleCount] = useState(0);
  const [secondCircleCount, setSecondCircleCount] = useState(0);
  const [deathCount, setDeathCountCount] = useState(0);
  const [circlePenaltyColor, setCirclePenaltyColor] = useState("");
  const [banCount, setBanCount] = useState(0);
  const [pickCount, setPickCount] = useState(0);
  const [stage, setStage] = useState<"ban" | "pick" | null>("ban");
  const [maxCharactersPick, setMaxCharactersPick] = useState(2);
  const [characterForCost, setCharacterForCost] = useState<CharacterData>();

  const [timer, setTimer] = useState(30);
  const [penaltyTimer, setPenaltyTimer] = useState(120);

  const [defaultTimer, setDefaultTimer] = useState(0);

  const [pickedItems, setPickedItems] = useState<
    Record<string, { cost: number }>
  >({});

  const queryClient = useQueryClient();

  const {
    data: {
      secondPlayerBannedCharacters,
      firstPlayerPickedCharacters,
      secondPlayerPickedCharacters,
      firstPlayerBannedCharacters,
      isSecondPlayerBanOrPick,
      secondPlayerTotalCost,
      globalStage,
      secondPlayerFilteredCharacters,
      fourthPlayerFilteredCharacters,
    },
    operations: {
      setSecondPlayerPickedCharacters,
      secondPlayerPickOrBan,
      firstPlayerPickOrBan,
      setSecondPlayerTotalCost,
      setGlobalStage,
      setSecondPlayerBannedCharacters,
      setFirstPlayerBannedCharacters,
      setSecondPlayerFilteredCharacters,
      setFirstPlayerFilteredCharacters,
      setThirdPlayerFilteredCharacters,
      setFourthPlayerFilteredCharacters,
    },
  } = useCharactersContext();

  const {
    data: timerData,
    isLoading: isTimerLoading,
    error: timerError,
  } = useFetchTimer();

  const { totalTimer, currentTimer, timerReset } = usePickTimer({
    timer,
    setTimer,
    isPickStarted: isSecondPlayerBanOrPick,
    setPenaltyTimer,
    penaltyTimer,
    timerData: defaultTimer,
  });

  useEffect(() => {
    if (timerData && !isTimerLoading) {
      setTimer(timerData.mainTimer.minutes * 60 + timerData.mainTimer.seconds);
      setDefaultTimer(
        timerData.mainTimer.minutes * 60 + timerData.mainTimer.seconds,
      );
      setPenaltyTimer(
        timerData.penaltyTimer.minutes * 60 - timerData.penaltyTimer.seconds,
      );

      timerReset();
    }
  }, [timerData, isTimerLoading, timerReset]);

  const {
    data: {
      currentPlayer,
      secondPlayerCirclePenalty,
      firstPlayerCirclePenalty,
    },
    operations: { setCurrentPlayer, setSecondPlayerCirclePenalty },
  } = useUserDataContext();

  const {
    data: dataForFirstUserFromDB,
    isLoading: isLoadingForFirstUserFromDB,
    error: dBFirstUserError,
  } = useFetchUserData({
    uid: firstUid,
  });

  const {
    data: dataForSecondUserFromDB,
    isLoading: isLoadingForSecondUserFromDB,
    error: dBSecondUserError,
  } = useFetchUserData({
    uid: secondUid,
  });

  useEffect(() => {
    setGlobalStage(
      checkGlobalStage({
        firstPlayerPickedCharacters,
        secondPlayerPickedCharacters,
        secondPlayerBannedCharacters,
        firstPlayerBannedCharacters,
      }),
    );
  }, [
    stage,
    firstPlayerPickedCharacters,
    secondPlayerPickedCharacters,
    secondPlayerBannedCharacters,
    firstPlayerBannedCharacters,
    setGlobalStage,
  ]);

  useEffect(() => {
    isTimerStart({
      pickedCharactersSecondPlayer: secondPlayerPickedCharacters,
      bannedCharactersSecondPlayer: secondPlayerBannedCharacters,
      bannedCharactersFirstPlayer: firstPlayerBannedCharacters,
      pickedCharactersFirstPlayer: firstPlayerPickedCharacters,
      startPickOrBanForSecondPlayer: secondPlayerPickOrBan,
      startPickOrBanForFirstPlayer: firstPlayerPickOrBan,
      setCurrentPlayer: setCurrentPlayer,
    });
  }, [
    firstPlayerBannedCharacters,
    firstPlayerPickOrBan,
    firstPlayerPickedCharacters,
    secondPlayerBannedCharacters,
    secondPlayerPickOrBan,
    secondPlayerPickedCharacters,
    setCurrentPlayer,
  ]);

  useEffect(() => {
    if (
      dataForFirstUserFromDB &&
      dataForFirstUserFromDB.characters &&
      !isLoadingForFirstUserFromDB
    ) {
      setSecondPlayerFilteredCharacters(dataForFirstUserFromDB.characters);
    }

    if (
      dataForSecondUserFromDB &&
      dataForSecondUserFromDB.characters &&
      !isLoadingForSecondUserFromDB
    ) {
      setFourthPlayerFilteredCharacters(dataForSecondUserFromDB.characters);
    }
  }, [
    dataForFirstUserFromDB,
    dataForSecondUserFromDB,
    isLoadingForFirstUserFromDB,
    isLoadingForSecondUserFromDB,
    setFourthPlayerFilteredCharacters,
    setSecondPlayerFilteredCharacters,
  ]);

  useEffect(() => {
    if (secondPlayerPickedCharacters.length === 4 && stage === "ban") {
      setStage("pick");
      setMaxCharactersPick(8);
    }
  }, [secondPlayerPickedCharacters, stage]);

  const onCharacterClick = async (character: CharacterData) => {
    if (secondPlayerPickedCharacters.length >= 8) {
      secondPlayerPickOrBan(false);
    } else {
      secondPlayerPickOrBan(true);
    }

    if (secondPlayerPickedCharacters.length === 8) {
      console.log("8");
      console.log("secondPlayerPickedCharacters 8");

      return;
    }

    console.log("STAGE: ", stage, "PLAYER: ", currentPlayer);

    const getCharacterPerId = await getCharacter(character.id);

    const newCharacter = {
      ...character,
      cost: getCharacterPerId.cost,
      rankCost: getCharacterPerId.rankCost,
      rank: 0,
    };

    if (stage === "ban") {
      characterOperation({
        charactersOperation: secondPlayerBannedCharacters,
        setFirstPlayerFilteredCharacters,
        setSecondPlayerFilteredCharacters,
        userCharacter: newCharacter,
        setCharactersOperation: setFirstPlayerBannedCharacters,
        stage,
        setStage,
        maxCharactersArrLength: 1,
        currentStage: "ban",
        stageCount: banCount,
        setStageCount: setBanCount,
        currentPlayer: 2,
        setFourthPlayerFilteredCharacters,
        setThirdPlayerFilteredCharacters,
      });
    } else {
      characterOperation({
        charactersOperation: secondPlayerPickedCharacters,
        setFirstPlayerFilteredCharacters,
        setSecondPlayerFilteredCharacters,
        userCharacter: newCharacter,
        setCharactersOperation: setSecondPlayerPickedCharacters,
        stage,
        setStage,
        maxCharactersArrLength: maxCharactersPick,
        currentStage: "pick",
        stageCount: pickCount,
        setStageCount: setPickCount,
        currentPlayer: 2,
        setFourthPlayerFilteredCharacters,
        setThirdPlayerFilteredCharacters,
      });
    }
    timerReset();
  };

  useEffect(() => {
    if (dataForFirstUserFromDB && !isLoadingForFirstUserFromDB) {
      const firstPickAndBansData = {
        characters: secondPlayerFilteredCharacters,
        picked: secondPlayerPickedCharacters,
        banned: secondPlayerBannedCharacters,
        uid: firstUid,
        firstCircleCount: firstCircleCount,
        secondCircleCount: secondCircleCount,
        deathCount: deathCount,
        stage: stage,
        nickname: dataForFirstUserFromDB.nickname,
      };

      try {
        const firstPlayerResponse =
          createPickOrBansForSecondUser(firstPickAndBansData);
        console.log(
          "Successfully updated picks and bans on the server:",
          firstPlayerResponse,
        );

        queryClient.refetchQueries("pickAndBans");
      } catch (error) {
        console.error("Failed to update picks and bans on the server:", error);
      }
    }
    if (dataForSecondUserFromDB && !isLoadingForSecondUserFromDB) {
      const fourthPickAndBansData = {
        characters: fourthPlayerFilteredCharacters,
        picked: secondPlayerPickedCharacters,
        banned: secondPlayerBannedCharacters,
        uid: secondUid,
        firstCircleCount: firstCircleCount,
        secondCircleCount: secondCircleCount,
        deathCount: deathCount,
        stage: stage,
        nickname: dataForSecondUserFromDB.nickname,
      };

      try {
        const secondPlayerResponse = createPickOrBansForFourthUser(
          fourthPickAndBansData,
        );

        console.log(
          "Successfully updated picks and bans on the server:",
          secondPlayerResponse,
        );

        queryClient.refetchQueries("pickAndBans");
      } catch (error) {
        console.error("Failed to update picks and bans on the server:", error);
      }
    }
  }, [
    deathCount,
    firstCircleCount,
    queryClient,
    secondCircleCount,
    secondPlayerBannedCharacters,
    secondPlayerFilteredCharacters,
    secondPlayerPickedCharacters,
    stage,
    firstUid,
    dataForSecondUserFromDB,
    dataForFirstUserFromDB,
    isLoadingForFirstUserFromDB,
    isLoadingForSecondUserFromDB,
    fourthPlayerFilteredCharacters,
    secondUid,
  ]);

  useEffect(() => {
    calculateCost({
      setTotalPickCost: setSecondPlayerTotalCost,
      playerPickedCharactersOrCones: secondPlayerPickedCharacters,
    });
  }, [secondPlayerPickedCharacters, setSecondPlayerTotalCost]);

  const wrapperRef = useRef(null);
  useOutsideDetect({ ref: wrapperRef, setIsOpen: setIsCircleOpen });

  // useEffect(() => {
  //   if (
  //     firstPlayerBannedCharacters.length === 1 ||
  //     firstPlayerBannedCharacters.length === 2
  //   ) {
  //     secondPlayerPickOrBan(true);
  //
  //     if (timer === 0) {
  //       timerReset();
  //       secondPlayerPickOrBan(false);
  //     }
  //   }
  // }, [firstPlayerBannedCharacters, secondPlayerPickOrBan, timer, timerReset]);

  const router = useRouter();

  if (isLoadingForFirstUserFromDB || isLoadingForSecondUserFromDB)
    return <div>Loading...</div>;

  if (dBFirstUserError) return <div>First user not fount</div>;

  if (dBSecondUserError) return <div>Second user not fount</div>;

  return (
    <div className="p-5 duration-300">
      {secondPlayerPickedCharacters.length === 8 && (
        <StyledNextStageButton onClick={() => router.push("/pickedOutput")}>
          next stage
        </StyledNextStageButton>
      )}
      <div className="HUMAN flex flex-row-reverse">
        <div>
          <TimerSection>
            <div>total cost: {secondPlayerTotalCost}</div>

            <TimerSection>
              <div>reserve time</div>

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
                  <div>{dataForFirstUserFromDB.nickname}</div>
                </PlayerName>
                <PlusSection>+</PlusSection>

                <PlayerName player={2}>
                  <div>{dataForSecondUserFromDB.nickname}</div>
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
            <div>
              <CharactersDisplay
                onCharacterClick={onCharacterClick}
                secondPlayerFilteredCharacters={secondPlayerFilteredCharacters}
                fourthPlayerFilteredCharacters={fourthPlayerFilteredCharacters}
              />
            </div>
          </div>
        </div>
        <StyledPlayerBanAndPick>
          <BanAndPicks
            isPickOrBan={isSecondPlayerBanOrPick}
            setPenaltyTimer={setPenaltyTimer}
            penaltyTimer={timer}
            userNickname={dataForFirstUserFromDB.nickname}
            userUid={firstUid}
            globalStage={globalStage}
            currentPlayerForStyle={2}
            currentStage={stage}
            currentPlayer={currentPlayer}
            charactersForFirstPlayer={dataForFirstUserFromDB.characters}
            charactersForSecondPlayer={dataForSecondUserFromDB.characters}
            bannedCharacters={secondPlayerBannedCharacters}
            pickedCharacters={secondPlayerPickedCharacters}
            setSecondPlayerFilteredCharacters={
              setSecondPlayerFilteredCharacters
            }
            setFourthPlayerFilteredCharacters={
              setFourthPlayerFilteredCharacters
            }
            setThirdPlayerFilteredCharacters={setThirdPlayerFilteredCharacters}
            setFirstPlayerFilteredCharacters={setFirstPlayerFilteredCharacters}
            setBannedCharacters={setSecondPlayerBannedCharacters}
            setPickedCharacters={setSecondPlayerPickedCharacters}
            setBanCount={setBanCount}
            setPickCount={setPickCount}
            setStage={setStage}
          />
        </StyledPlayerBanAndPick>
      </div>
    </div>
  );
};

const CharacterGrid = styled.div`
  display: flex;
  justify-content: space-between; /* или space-around */
`;

const CharacterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* расстояние между карточками персонажей */
`;

const CharacterCard = styled.div`
  display: flex;
  align-items: center;
  gap: 5px; /* расстояние между элементами внутри карточки */
`;

const StyledPlayerBanAndPick = styled.div`
  position: absolute;

  left: 59.5%;
  top: 5%;

  z-index: 1;
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

const StyledNextStageButton = styled(GlobalButton)`
  position: absolute;

  left: 45%;

  width: 10%;

  background-color: #c84a32;

  &:hover {
    width: 10%;
    border: 1px solid #1c6ea4;
    border-radius: 10px;
    background-color: #31a8ff;
    color: #000000;
    transition-duration: 300ms;
  }
`;
