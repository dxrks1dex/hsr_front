import { usePathname, useRouter } from "next/navigation";
import { useUserDataContext } from "@/context/userDataContext";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLightConeContext } from "@/context/useLightConeContext";
import { useCharactersContext } from "@/context/useCharactersContext";
import { GlobalButton, GlobalInput } from "@/components/styled/userStyles";

export const MainPage = () => {
  const [firstUserUid, setFirstUserUid] = useState<string | null>(null);
  const [secondUserUid, setSecondUserUid] = useState<string | null>(null);
  const [thirdUserUid, setThirdUserUid] = useState<string | null>(null);
  const [fourthUserUid, setFourthUserUid] = useState<string | null>(null);

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

  return (
    <StyledMainPageContainer>
      <StyledContainer>
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
            onClick={() =>
              router.push(
                `/q?user1=${firstUserUid}&user2=${thirdUserUid}&user3=${secondUserUid}&user4=${fourthUserUid}`,
              )
            }
          >
            To ban and pick action
          </StyledBanAndPickButton>
          <StyledBanAndPickButton onClick={() => router.push(`/pick-and-bans`)}>
            To ban and pick screen
          </StyledBanAndPickButton>
        </StyledButtonContainerAction>
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
      </StyledButtonContainer>
      <GlobalButton onClick={() => router.push("/pickedOutput")}>
        Picks
      </GlobalButton>
      <GlobalButton
        onClick={() => router.push("/pickedOutput/pickedProdOutput")}
      >
        Picks output
      </GlobalButton>
    </StyledMainPageContainer>
  );
};

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
  margin-top: 10%;
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
