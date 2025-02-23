import { usePathname, useRouter } from "next/navigation";
import { useUserDataContext } from "@/context/userDataContext";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useLightConeContext } from "@/context/useLightConeContext";
import { useCharactersContext } from "@/context/useCharactersContext";
import { GlobalButton, GlobalInput } from "@/components/styled/userStyles";
import { ExampleComponent } from "@/components/Test";
import { SideChoose } from "@/components/randomFlip/SideChoose";
import { ChangeTimer } from "@/utils/timer/ChangeTimer";
import {
  createPickOrBansWithId,
  deletePickAndBanById,
  getAllPickAndBansById,
  IPickAndBans,
} from "@/fetch/api/pickAndBans";
import { getUser } from "@/fetch/api/users";
import { useGetAllPickAndBans } from "@/fetch/fetch";
import { LoadingAnimation } from "@/components/common/LoadingAnimation";
import { useQueryClient } from "react-query";
import { GamesList } from "@/components/mainPage/GameList";

export const MainPage = () => {
  const [firstUserUid, setFirstUserUid] = useState<string | null>(null);
  const [secondUserUid, setSecondUserUid] = useState<string | null>(null);
  const [thirdUserUid, setThirdUserUid] = useState<string | null>(null);
  const [fourthUserUid, setFourthUserUid] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: isDataLoading,
    error,
    isError,
  } = useGetAllPickAndBans();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const pathname = usePathname();

  const {
    operations: { setConeForUser },
  } = useLightConeContext();
  const {
    operations: { setCharactersForUser },
  } = useCharactersContext();

  const {
    data: { newUserUid, userName },
    operations: { setUserName, setNewUserUid },
  } = useUserDataContext();

  useEffect(() => {
    if (pathname === "/") {
      setConeForUser([]);
      setCharactersForUser([]);
    }
  }, [pathname, setCharactersForUser, setConeForUser]);

  useEffect(() => {
    return () => {
      setFirstUserUid("");
      setSecondUserUid("");
      setThirdUserUid("");
      setFourthUserUid("");
    };
  }, []);

  const handleCreatePickAndBan = async () => {
    try {
      setIsLoading(true);

      const createdPickAndBan = await createPickOrBansWithId({
        firstPlayer: {
          banned: [],
          picked: [],
          deathCount: 0,
          uid: firstUserUid,
          stage: null,
          firstCircleCount: 0,
          secondCircleCount: 0,
          characters: [],
          nickname: "",
        },
        secondPlayer: {
          banned: [],
          picked: [],
          deathCount: 0,
          uid: secondUserUid,
          stage: null,
          firstCircleCount: 0,
          secondCircleCount: 0,
          characters: [],
          nickname: "",
        },
        fourthPlayer: {
          banned: [],
          picked: [],
          deathCount: 0,
          uid: fourthUserUid,
          stage: null,
          firstCircleCount: 0,
          secondCircleCount: 0,
          characters: [],
          nickname: "",
        },
        thirdPlayer: {
          banned: [],
          picked: [],
          deathCount: 0,
          uid: thirdUserUid,
          stage: null,
          firstCircleCount: 0,
          secondCircleCount: 0,
          characters: [],
          nickname: "",
        },
      });

      const { _id: createdId } = createdPickAndBan;

      if (createdId) {
        router.push(
          `/q?gameId=${createdId}&user1=${firstUserUid}&user2=${thirdUserUid}&user3=${secondUserUid}&user4=${fourthUserUid}`,
        );
      } else {
        console.error("ID not accepted");
      }
    } catch (error) {
      console.error("Error of create pick and bans:", error);
    } finally {
      setIsLoading(false);
      queryClient.refetchQueries("game/pickAndBan");
    }
  };

  if (isDataLoading || isLoading) return <LoadingAnimation />;

  return (
    <StyledMainPageColour>
      <StyledGamesContainer>
        {data.map((game: IPickAndBans) => (
          <GamesList game={game} key={game._id} />
          // <li key={game._id}>
          //   Game ID: {game._id} {game?.firstPlayer?.nickname} +{" "}
          //   {game.thirdPlayer.nickname} vs {game?.secondPlayer?.nickname} +{" "}
          //   {game.fourthPlayer.nickname}
          //   <button
          //     style={{ border: "1px solid black" }}
          //     onClick={() => router.push(`/pick-and-bans/q?gameId=${game._id}`)}
          //   >
          //     To spectate
          //   </button>
          //   <button
          //     style={{ border: "1px solid black" }}
          //     onClick={() =>
          //       router.push(`/pickedProdOutput/q?gameId=${game._id}`)
          //     }
          //   >
          //     To spectate second screen
          //   </button>
          //   <button
          //     style={{ border: "1px solid black" }}
          //     onClick={() =>
          //       router.push(
          //         `/q?gameId=${game._id}&user1=${game?.firstPlayer?.uid}&user2=${game.thirdPlayer.uid}&user3=${game?.secondPlayer?.uid}&user4=${game.fourthPlayer.uid}`,
          //       )
          //     }
          //   >
          //     To edit
          //   </button>
          //   <button
          //     style={{ border: "1px solid black" }}
          //     onClick={() => router.push(`/pickedOutput/q?gameId=${game._id}`)}
          //   >
          //     To edit second screen
          //   </button>
          //   <button
          //     style={{ border: "1px solid black" }}
          //     onClick={() => game._id && deletePickAndBanById(game._id)}
          //   >
          //     Delete game
          //   </button>
          // </li>
        ))}
      </StyledGamesContainer>
      <StyledMainPageContainer>
        <ChangeTimer isPickStarted={false} />

        <StyledContainer>
          <SideChoose />

          <StyledBanAndPickDiv>
            <StyledTeamInputContainer>
              <GlobalInput
                team={1}
                type={"number"}
                placeholder={"First Uid"}
                onChange={(e) => setFirstUserUid(e.target.value)}
                inputMode={"text"}
              />
              <GlobalInput
                team={1}
                type={"number"}
                placeholder={"Third Uid"}
                onChange={(e) => setSecondUserUid(e.target.value)}
                inputMode={"text"}
              />
            </StyledTeamInputContainer>
            <StyledTeamInputContainer>
              <GlobalInput
                team={2}
                type={"number"}
                placeholder={"Second Uid"}
                onChange={(e) => setThirdUserUid(e.target.value)}
                inputMode={"text"}
              />
              <GlobalInput
                team={2}
                type={"number"}
                placeholder={"Fourth Uid"}
                onChange={(e) => setFourthUserUid(e.target.value)}
                inputMode={"text"}
              />
            </StyledTeamInputContainer>
          </StyledBanAndPickDiv>
          <StyledButtonContainerAction>
            <StyledBanAndPickButton
              onClick={async () => {
                await handleCreatePickAndBan();
              }}
            >
              Create pick and ban
            </StyledBanAndPickButton>
            {/*<StyledBanAndPickButton*/}
            {/*  onClick={() => router.push(`/pick-and-bans`)}*/}
            {/*>*/}
            {/*  To ban and pick screen*/}
            {/*</StyledBanAndPickButton>*/}
          </StyledButtonContainerAction>
          {/*<StyledButtonContainerAction>*/}
          {/*  <GlobalButton onClick={() => router.push("/pickedOutput")}>*/}
          {/*    Picks*/}
          {/*  </GlobalButton>*/}
          {/*  <GlobalButton*/}
          {/*    onClick={() => router.push("/pickedOutput/pickedProdOutput")}*/}
          {/*  >*/}
          {/*    Picks output*/}
          {/*  </GlobalButton>*/}
          {/*</StyledButtonContainerAction>*/}
        </StyledContainer>
        <StyledInputContainer>
          <StyledNewUserInput
            team={1}
            type={"number"}
            placeholder={"New user uid"}
            onChange={(e) => setNewUserUid(e.target.value)}
            inputMode={"text"}
          />
          <StyledNewUserInput
            team={1}
            placeholder={"New user name"}
            onChange={(e) => setUserName(e.target.value)}
          />
        </StyledInputContainer>
        <StyledButtonContainer>
          <GlobalButton
            onClick={() =>
              router.push(
                `/userOperations/q?op=addNewUser&uid=${newUserUid}&nickname=${userName}`,
              )
            }
          >
            Reg new user
          </GlobalButton>
          <GlobalButton
            onClick={() =>
              router.push(`/userOperations/q?op=changeUser&uid=${newUserUid}`)
            }
          >
            Change User
          </GlobalButton>
          <GlobalButton onClick={() => router.push(`/changeLightCone`)}>
            Change light cones
          </GlobalButton>
          <GlobalButton onClick={() => router.push(`/changeCharacters`)}>
            Change characters
          </GlobalButton>
          <GlobalButton onClick={() => router.push(`/synergy`)}>
            Synergy
          </GlobalButton>
        </StyledButtonContainer>

        {/*<ExampleComponent />*/}
      </StyledMainPageContainer>
    </StyledMainPageColour>
  );
};

const StyledMainPageColour = styled.div`
  background-color: #c48353;

  min-height: 100vh;
`;

const StyledTeamInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMainPageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  max-width: 35%;

  margin-left: 35%;
  //margin-top: 10%;
  padding-top: 10%;

  //background-color: #c48353;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StyledBanAndPickDiv = styled.div`
  display: flex;

  justify-content: space-between;

  width: 100%;
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const StyledNewUserInput = styled(GlobalInput)`
  width: 70%;
`;

const StyledBanAndPickButton = styled(GlobalButton)`
  width: 25%;
`;

const StyledButtonContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const StyledButtonContainerAction = styled.section`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 90%;
`;

const StyledGamesContainer = styled.div`
  width: 33%; // Занимает 1/3 экрана
  max-height: 80%; // Ограничиваем высоту
  overflow-y: auto; // Добавляем скролл
  border: 1px solid #444;
  border-radius: 8px;
  padding: 10px;
  background-color: #1e1e2f; // Тёмный фон
  position: absolute;
  left: 1%; // Располагаем слева
  top: 5%;
  color: #f0f0f0; // Светлый текст
`;
