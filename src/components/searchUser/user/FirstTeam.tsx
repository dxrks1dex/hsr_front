import { useFetchTimer, useFetchUserData } from "@/fetch/fetch";
import React, { useEffect, useRef, useState } from "react";
import {
  CharacterImage,
  CharacterName,
  CharactersContainer,
  PlayerImage,
  PlayerInfo,
  PlayerName,
  PlayerSection,
  ConesForCharacters,
  RankForCharacters,
  MainTimerTextStyle,
  TimerSection,
  PenaltyTimerText,
  CharacterCard,
  PlayerInfoSection,
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
import { CharacterData, LightConeData } from "@/types/interface";
import { useUserDataContext } from "@/context/userDataContext";
import { checkGlobalStage } from "@/utils/stage/checkGlobalStage";
import { calculateCost } from "@/utils/cost/calculateCost";
import { findCharacterById } from "@/utils/findCharacterById";
import { useOutsideDetect } from "@/utils/useOutsideDetect";
import { LoginButton } from "@/styles/LoginButton";
import { BanAndPicks } from "@/components/banAndPick/BanAndPicks";
import {
  createPickOrBansForFirstUser,
  createPickOrBansForThirdUser,
  updatePickOrBansForFirstUserById,
  updatePickOrBansForThirdUserById,
} from "@/fetch/api/pickAndBans";
import { useQueryClient } from "react-query";
import { freeCharacter } from "@/common/freeCharacter";
import {
  CharacterPlayerCard,
  CharactersDisplay,
} from "@/components/characterGallery/CharacterPlayerCard";
import { getCharacter } from "@/fetch/api/characters";
import timerImage from "@/pic/Timer.png";
import plusImage from "@/pic/plus.jpg";
import { ChangeTimer } from "@/utils/timer/ChangeTimer";
import { useTimerContext } from "@/context/useTimerContext";
import { LoadingAnimation } from "@/components/common/LoadingAnimation";

interface Props {
  firstUid: string | null;
  secondUid: string | null;
  gameId: string | null;

  currentPlayer: number;
}

export const FirstTeam = ({ firstUid, secondUid, gameId }: Props) => {
  const [isCircleOpen, setIsCircleOpen] = useState(true);
  const [firstCircleCount, setFirstCircleCount] = useState(0);
  const [secondCircleCount, setSecondCircleCount] = useState(0);
  const [deathCount, setDeathCountCount] = useState(0);
  const [circlePenaltyColor, setCirclePenaltyColor] = useState("");
  const [banCount, setBanCount] = useState(0);
  const [pickCount, setPickCount] = useState(0);
  const [stage, setStage] = useState<"ban" | "pick" | null>("ban");
  const [maxCharactersPick, setMaxCharactersPick] = useState(2);
  const [timer, setTimer] = useState(30);
  const [penaltyTimer, setPenaltyTimer] = useState(120);

  const [defaultTimer, setDefaultTimer] = useState(0);

  const queryClient = useQueryClient();

  console.log(gameId);

  const {
    data: { mainTimer },
    operations: { resetMainTimer },
  } = useTimerContext();

  const {
    data: {
      firstPlayerPickedCharacters,
      secondPlayerPickedCharacters,
      secondPlayerBannedCharacters,
      firstPlayerBannedCharacters,
      isFirstPlayerBanOrPick,
      isSecondPlayerBanOrPick,
      firstPlayerTotalCost,
      globalStage,
      firstPlayerFilteredCharacters,
      thirdPlayerFilteredCharacters,
    },
    operations: {
      setFirstPlayerPickedCharacters,
      setFirstPlayerBannedCharacters,
      setSecondPlayerBannedCharacters,
      firstPlayerPickOrBan,
      secondPlayerPickOrBan,
      setFirstPlayerTotalCost,
      setGlobalStage,
      setFirstPlayerFilteredCharacters,
      setSecondPlayerFilteredCharacters,
      setThirdPlayerFilteredCharacters,
      setFourthPlayerFilteredCharacters,
    },
  } = useCharactersContext();

  const {
    data: { currentPlayer, firstPlayerCirclePenalty },
    operations: { setCurrentPlayer, setFirstPlayerCirclePenalty },
  } = useUserDataContext();

  const {
    data: timerData,
    isLoading: isTimerLoading,
    error: timerError,
  } = useFetchTimer();

  useEffect(() => {
    if (timerData && !isTimerLoading) {
      setDefaultTimer(
        timerData.mainTimer.minutes * 60 + timerData.mainTimer.seconds,
      );
      setPenaltyTimer(
        timerData.penaltyTimer.minutes * 60 - timerData.penaltyTimer.seconds,
      );
    }
  }, [timerData, isTimerLoading]);

  const { totalTimer, currentTimer, timerReset } = usePickTimer({
    timer: mainTimer,
    setTimer,
    isPickStarted: isFirstPlayerBanOrPick,
    penaltyTimer,
    setPenaltyTimer,
    timerData: defaultTimer,
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

    console.log();
  }, [
    firstPlayerPickedCharacters,
    secondPlayerPickedCharacters,
    secondPlayerBannedCharacters,
    firstPlayerBannedCharacters,
    setGlobalStage,
  ]);

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
    isTimerStart({
      pickedCharactersSecondPlayer: secondPlayerPickedCharacters,
      bannedCharactersSecondPlayer: secondPlayerBannedCharacters,
      bannedCharactersFirstPlayer: firstPlayerBannedCharacters,
      pickedCharactersFirstPlayer: firstPlayerPickedCharacters,
      startPickOrBanForFirstPlayer: firstPlayerPickOrBan,
      startPickOrBanForSecondPlayer: secondPlayerPickOrBan,
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
    const transformCharacterId = (characters: CharacterData[]) => {
      return characters.map((character) => {
        let transformedCharacter = { ...character };

        if (character.id === "8001") {
          transformedCharacter = {
            ...character,
            id: "8002",
            icon: character.icon.replace("8001", "8002"),
          };
        } else if (character.id === "8003") {
          transformedCharacter = {
            ...character,
            id: "8004",
            icon: character.icon.replace("8003", "8004"),
          };
        } else if (character.id === "8005") {
          transformedCharacter = {
            ...character,
            id: "8006",
            icon: character.icon.replace("8005", "8006"),
          };
        }

        return transformedCharacter;
      });
    };

    if (dataForFirstUserFromDB && dataForFirstUserFromDB.characters) {
      const transformedFirstUserCharacters = transformCharacterId(
        dataForFirstUserFromDB.characters,
      );
      setFirstPlayerFilteredCharacters(transformedFirstUserCharacters);
    }

    if (dataForSecondUserFromDB && dataForSecondUserFromDB.characters) {
      const transformedSecondUserCharacters = transformCharacterId(
        dataForSecondUserFromDB.characters,
      );
      setThirdPlayerFilteredCharacters(transformedSecondUserCharacters);
    }
  }, [
    dataForFirstUserFromDB,
    dataForSecondUserFromDB,
    setFirstPlayerFilteredCharacters,
    setThirdPlayerFilteredCharacters,
  ]);

  useEffect(() => {
    if (firstPlayerPickedCharacters.length === 4 && stage === "ban") {
      setStage("pick");
      setMaxCharactersPick(8);
    }

    if (firstPlayerPickedCharacters.length === 8) {
      setStage(null);
    }
  }, [firstPlayerPickedCharacters, stage]);

  const onCharacterClick = async (character: CharacterData) => {
    if (firstPlayerPickedCharacters.length >= 8) {
      firstPlayerPickOrBan(false);
    } else {
      firstPlayerPickOrBan(true);
    }

    if (firstPlayerPickedCharacters.length === 8) {
      console.log(firstPlayerPickedCharacters);
      console.log("firstPlayerPickedCharacters 8");
      return;
    }

    if (!isSecondPlayerBanOrPick && globalStage === "ban") {
      console.log("isSecondPlayerBanOrPick: ", isSecondPlayerBanOrPick);

      firstPlayerPickOrBan(false);
      secondPlayerPickOrBan(true);

      return;
    }

    if (!isFirstPlayerBanOrPick && globalStage === "pick") {
      firstPlayerPickOrBan(false);

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

    console.log("CHARACTER ID: ", character.id);

    if (stage === "ban") {
      characterOperation({
        charactersOperation: firstPlayerBannedCharacters,
        setFirstPlayerFilteredCharacters,
        setSecondPlayerFilteredCharacters,
        userCharacter: newCharacter,
        setCharactersOperation: setSecondPlayerBannedCharacters,
        stage,
        setStage,
        maxCharactersArrLength: 1,
        currentStage: "ban",
        stageCount: banCount,
        setStageCount: setBanCount,
        currentPlayer: 1,
        setFourthPlayerFilteredCharacters,
        setThirdPlayerFilteredCharacters,
      });
    } else {
      characterOperation({
        charactersOperation: firstPlayerPickedCharacters,
        setFirstPlayerFilteredCharacters,
        setSecondPlayerFilteredCharacters,
        userCharacter: newCharacter,
        setCharactersOperation: setFirstPlayerPickedCharacters,
        stage,
        setStage,
        maxCharactersArrLength: maxCharactersPick,
        currentStage: "pick",
        stageCount: pickCount,
        setStageCount: setPickCount,
        currentPlayer: 1,
        setFourthPlayerFilteredCharacters,
        setThirdPlayerFilteredCharacters,
      });
    }
    timerReset();
    resetMainTimer();

    // const firstPickAndBansData = {
    //   characters: firstPlayerFilteredCharacters,
    //   picked: firstPlayerPickedCharacters,
    //   banned: firstPlayerBannedCharacters,
    // };
    //
    // const secondPickAndBansData = {
    //   characters: thirdPlayerFilteredCharacters,
    //   picked: firstPlayerPickedCharacters,
    //   banned: firstPlayerBannedCharacters,
    // };
    //
    // try {
    //   const response = await createPickOrBansForFirstUser(firstPickAndBansData);
    //   const secondResponse = await createPickOrBansForThirdUser()
    //   console.log(
    //     "Successfully updated picks and bans on the server:",
    //     response,
    //   );
    // } catch (error) {
    //   console.error("Failed to update picks and bans on the server:", error);
    // }
  };

  useEffect(() => {
    if (dataForFirstUserFromDB && !isLoadingForFirstUserFromDB) {
      const firstPickAndBansData = {
        characters: firstPlayerFilteredCharacters,
        picked: firstPlayerPickedCharacters,
        banned: firstPlayerBannedCharacters,
        uid: firstUid,
        firstCircleCount: firstCircleCount,
        secondCircleCount: secondCircleCount,
        deathCount: deathCount,
        stage: stage,
        nickname: dataForFirstUserFromDB.nickname,
      };

      try {
        const firstPlayerResponse = updatePickOrBansForFirstUserById(
          gameId,
          firstPickAndBansData,
        );
        console.log(
          "Successfully updated picks and bans on the server:",
          firstPlayerResponse,
        );
        queryClient.refetchQueries(`game/pickAndBan/${gameId}`);
      } catch (error) {
        console.error("Failed to update picks and bans on the server:", error);
      }
    }
    if (dataForSecondUserFromDB && !isLoadingForSecondUserFromDB) {
      const thirdPickAndBansData = {
        characters: thirdPlayerFilteredCharacters,
        picked: firstPlayerPickedCharacters,
        banned: firstPlayerBannedCharacters,
        uid: secondUid,
        firstCircleCount: firstCircleCount,
        secondCircleCount: secondCircleCount,
        deathCount: deathCount,
        stage: stage,
        nickname: dataForSecondUserFromDB.nickname,
      };

      try {
        const secondPlayerResponse = updatePickOrBansForThirdUserById(
          gameId,
          thirdPickAndBansData,
        );

        console.log(
          "Successfully updated picks and bans on the server:",
          secondPlayerResponse,
        );

        queryClient.refetchQueries(`game/pickAndBan/${gameId}`);
      } catch (error) {
        console.error("Failed to update picks and bans on the server:", error);
      }
    }
  }, [
    deathCount,
    firstCircleCount,
    firstPlayerBannedCharacters,
    firstPlayerFilteredCharacters,
    firstPlayerPickedCharacters,
    queryClient,
    secondCircleCount,
    stage,
    firstUid,
    dataForFirstUserFromDB,
    isLoadingForFirstUserFromDB,
    dataForSecondUserFromDB,
    isLoadingForSecondUserFromDB,
    thirdPlayerFilteredCharacters,
    secondUid,
    gameId,
  ]);

  useEffect(() => {
    calculateCost({
      setTotalPickCost: setFirstPlayerTotalCost,
      playerPickedCharactersOrCones: firstPlayerPickedCharacters,
    });

    console.log(firstPlayerPickedCharacters);
  }, [firstPlayerPickedCharacters, setFirstPlayerTotalCost]);

  const wrapperRef = useRef(null);
  useOutsideDetect({ ref: wrapperRef, setIsOpen: setIsCircleOpen });

  // useEffect(() => {
  //   if (
  //     secondPlayerBannedCharacters.length === 1 ||
  //     secondPlayerBannedCharacters.length === 2
  //   ) {
  //     firstPlayerPickOrBan(true);
  //
  //     if (timer === 1) {
  //       firstPlayerPickOrBan(false);
  //       setTimer((prevState) => prevState - 1);
  //     }
  //   }
  // }, [timer, firstPlayerPickOrBan, secondPlayerBannedCharacters, timerReset]);

  if (isLoadingForFirstUserFromDB || isLoadingForSecondUserFromDB)
    return <LoadingAnimation />;

  if (dBFirstUserError || dBSecondUserError)
    return <div style={{ color: "snow" }}>User not fount</div>;

  return (
    <div className="p-5 duration-300">
      <div className="flex flex-row justify-between">
        <div>
          <TimerSection>
            <TimerSection>
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
              <div className="self-end mb-1.5 ml-1.5">reserve time</div>
            </TimerSection>
            <div className="self-end mb-1.5">
              total cost: {firstPlayerTotalCost}
            </div>
            {/*<PenaltyTimerText className="text-white text-lg mt-5 font-bold">*/}
            {/*  Pick value: {secondPlayerTotalCost}*/}
            {/*</PenaltyTimerText>*/}
          </TimerSection>

          <TeamDisplay player={1}>
            <PlayerInfoSection currentPlayer={1}>
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
                {/*<StyledPlayerInputContainer>*/}
                {/*  <PlayerImage*/}
                {/*    src={`${ICON_DEFAULT_URL}/${dataForFirstUserFromDB?.avatar?.icon}`}*/}
                {/*  />*/}
                {/*</StyledPlayerInputContainer>*/}
                {/*<PlayerInputDiv>*/}
                {/*  <div>*/}
                {/*    <p className="text-white/55 text-[9px]">First circles:</p>*/}
                {/*    <PlayerInput*/}
                {/*      type={"number"}*/}
                {/*      onChange={(e) => setFirstCircleCount(Number(e.target.value))}*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*  <div>*/}
                {/*    <p className="text-white/55 text-[9px]">Second circles:</p>*/}
                {/*    <PlayerInput*/}
                {/*      type={"number"}*/}
                {/*      onChange={(e) => setSecondCircleCount(Number(e.target.value))}*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*  <div>*/}
                {/*    <p className="text-white/55 text-[9px]">Death count:</p>*/}
                {/*    <PlayerInput*/}
                {/*      type={"number"}*/}
                {/*      onChange={(e) => setDeathCountCount(Number(e.target.value))}*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*</PlayerInputDiv>*/}
                {/*<div className="my-3 flex flex-row text-white text-xl space-x-4 font-bold bg-slate-400/5 backdrop-blur-md px-2 py-1  rounded-lg border border-white/15 border-solid shadow-md shadow-white/10">*/}
                {/*  <div style={{ color: circlePenaltyColor }}>*/}
                {/*    {firstPlayerCirclePenalty === 0 ? (*/}
                {/*      <div>Penalty circles: {firstCircleCount}</div>*/}
                {/*    ) : (*/}
                {/*      <div>*/}
                {/*        Penalty circles: {firstPlayerCirclePenalty.toFixed(3)}*/}
                {/*      </div>*/}
                {/*    )}*/}
                {/*  </div>*/}
                {/*</div>*/}
              </PlayerInfo>
            </PlayerInfoSection>
          </TeamDisplay>

          <div className="flex flex-row ">
            {/*className="grid grid-cols-4 gap-2 w-[350px]"*/}
            {/*<div className="flex" key={freeCharacter?.id}>*/}
            {/*  <RankForCharacters>{freeCharacter?.rank}</RankForCharacters>*/}
            {/*  <CharacterImage*/}
            {/*    characterRarity={freeCharacter.rarity}*/}
            {/*    src={`${freeCharacter.icon}`}*/}
            {/*    onClick={() => onCharacterClick(freeCharacter)}*/}
            {/*  />*/}
            {/*  <CharacterCost>*/}
            {/*    {freeCharacter.rank === 0*/}
            {/*      ? freeCharacter.cost*/}
            {/*      : freeCharacter.rankCost[freeCharacter.rank - 1]}*/}
            {/*  </CharacterCost>*/}
            {/*</div>*/}
            <CharactersDisplay
              onCharacterClick={onCharacterClick}
              secondPlayerFilteredCharacters={firstPlayerFilteredCharacters}
              fourthPlayerFilteredCharacters={thirdPlayerFilteredCharacters}
            />
            {/*{firstPlayerFilteredCharacters*/}
            {/*  // .sort((a, b) => a.element.localeCompare(b.element))*/}
            {/*  .map((characterItem: CharacterData) => (*/}
            {/*    <CharacterPlayerCard*/}
            {/*      fn={onCharacterClick}*/}
            {/*      character={characterItem}*/}
            {/*    />*/}
            {/*  ))}*/}
            {/*{thirdPlayerFilteredCharacters*/}
            {/*  // .sort((a, b) => a.element.localeCompare(b.element))*/}
            {/*  .map((characterItem: CharacterData) => (*/}
            {/*    <CharacterPlayerCard*/}
            {/*      fn={onCharacterClick}*/}
            {/*      character={characterItem}*/}
            {/*    />*/}
            {/*  ))}*/}
          </div>
        </div>
        <StyledBanAndPickSection>
          <BanAndPicks
            setPenaltyTimer={setPenaltyTimer}
            penaltyTimer={timer}
            isPickOrBan={isFirstPlayerBanOrPick}
            userNickname={dataForFirstUserFromDB.nickname}
            userUid={firstUid}
            globalStage={globalStage}
            currentPlayerForStyle={1}
            currentStage={stage}
            currentPlayer={currentPlayer}
            charactersForFirstPlayer={dataForFirstUserFromDB.characters}
            charactersForSecondPlayer={dataForSecondUserFromDB.characters}
            bannedCharacters={firstPlayerBannedCharacters}
            pickedCharacters={firstPlayerPickedCharacters}
            setFirstPlayerFilteredCharacters={setFirstPlayerFilteredCharacters}
            setSecondPlayerFilteredCharacters={
              setSecondPlayerFilteredCharacters
            }
            setFourthPlayerFilteredCharacters={
              setFourthPlayerFilteredCharacters
            }
            setThirdPlayerFilteredCharacters={setThirdPlayerFilteredCharacters}
            setBannedCharacters={setFirstPlayerBannedCharacters}
            setPickedCharacters={setFirstPlayerPickedCharacters}
            setBanCount={setBanCount}
            setPickCount={setPickCount}
            setStage={setStage}
          />
        </StyledBanAndPickSection>
      </div>
    </div>
  );
};

const StyledBanAndPickSection = styled.div`
  //position: absolute;
  //
  //left: 30%;
  //top: 5%;

  margin-top: 10%;
`;

const StyledCircleInput = styled(GlobalInput)`
  height: 25px;

  width: 100%;
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
