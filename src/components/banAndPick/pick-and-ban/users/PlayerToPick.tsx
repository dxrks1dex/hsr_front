import { CharacterData } from "@/types/interface";
import { useFetchUserData } from "@/fetch/fetch";
import { CharacterCard } from "@/components/characters/CharacterCard";
import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  createPickOrBansForFirstUser,
  createPickOrBansForFourthUser,
  createPickOrBansForSecondUser,
  createPickOrBansForThirdUser,
} from "@/fetch/api/pickAndBans";
import { useQueryClient } from "react-query";
import { calculateCost } from "@/utils/cost/calculateCost";
import {
  CharacterCost,
  CharacterImage,
  CharactersCard,
  ConesForCharacters,
  PlayerInput,
  PlayerInputDiv,
  PlusSection,
  RankForCharacters,
} from "@/styles/userStyles";

interface Props {
  uid: string | null;
  player: number;
  firstPlayerNickname: string;
  secondPlayerNickname: string;

  firstCircleCountFromDb: number;
  secondCircleCountFromDb: number;
  deathCountFromDb: number;

  picked: CharacterData[];
  banned: CharacterData[];
}

export const PlayerToPick = ({
  uid,
  picked,
  player,
  firstPlayerNickname,
  secondPlayerNickname,
  banned,
  secondCircleCountFromDb,
  firstCircleCountFromDb,
  deathCountFromDb,
}: Props) => {
  const [playerTotalCost, setPlayerTotalCost] = useState(0);
  const [penaltyCircles, setPenaltyCircles] = useState(0);
  const [firstCircleCount, setFirstCircleCount] = useState(0);
  const [secondCircleCount, setSecondCircleCount] = useState(0);
  const [deathCount, setDeathCountCount] = useState(0);

  const [filteredCharacters, setFilteredCharacters] = useState<CharacterData[]>(
    [],
  );

  const { data, isLoading, isError } = useFetchUserData({ uid });

  const queryClient = useQueryClient();

  const [charactersToPickOutput, setCharactersToPickOutput] = useState([]);

  useEffect(() => {
    // if (data) {
    //   console.log(`picked for ${uid}: `, data);
    //
    //   // setFilteredCharacters(
    //   //   data.characters.filter((character: CharacterData) =>
    //   //     picked.some((pickedCharacter) => pickedCharacter.id === character.id),
    //   //   ),
    //   // );
    //
    //   setFilteredCharacters(
    //     data.characters.filter((character: CharacterData) =>
    //       picked.some((pickedCharacter) => pickedCharacter.id === character.id),
    //     ),
    //   );
    // }

    if (picked) {
      console.log(`picked for ${uid}: `, picked);

      setFilteredCharacters(picked);
    }
  }, [picked, uid]);

  useEffect(() => {
    if (secondCircleCountFromDb && firstCircleCountFromDb && deathCountFromDb) {
      setFirstCircleCount(firstCircleCountFromDb);
      setSecondCircleCount(secondCircleCountFromDb);
      setDeathCountCount(deathCountFromDb);
    }
  }, [secondCircleCountFromDb, firstCircleCountFromDb, deathCountFromDb]);

  useEffect(() => {
    calculateCost({
      setTotalPickCost: setPlayerTotalCost,
      playerPickedCharactersOrCones: filteredCharacters,
    });
  }, [filteredCharacters]);

  useEffect(() => {
    if (playerTotalCost <= 40) {
      setPenaltyCircles(
        firstCircleCount +
          secondCircleCount +
          (playerTotalCost - 40) / 6 +
          deathCount / 2,
      );

      console.log("first Player");
    } else if (playerTotalCost > 40) {
      setPenaltyCircles(
        firstCircleCount +
          secondCircleCount +
          (playerTotalCost - 40) / 4 +
          deathCount / 2,
      );

      console.log("first Player");
    }
  }, [playerTotalCost, firstCircleCount, secondCircleCount, deathCount]);

  const updateDataForPlayers = useCallback(async () => {
    const playerData = {
      picked: filteredCharacters,
      uid: uid,
      nickname: firstPlayerNickname,
      firstCircleCount: firstCircleCount,
      secondCircleCount: secondCircleCount,
      deathCount: deathCount,
      banned: banned,
    };

    console.log("filteredCharacters: ", filteredCharacters);

    if (player === 1) {
      try {
        const firstPlayerResponse = createPickOrBansForFirstUser(playerData);

        console.log(
          "Successfully updated picks and bans on the server:",
          firstPlayerResponse,
        );

        queryClient.refetchQueries("pickAndBans");
      } catch (error) {
        console.error("Failed to update picks and bans on the server:", error);
      }
    } else if (player === 2) {
      try {
        const firstPlayerResponse = createPickOrBansForSecondUser(playerData);

        console.log(
          "Successfully updated picks and bans on the server:",
          firstPlayerResponse,
        );

        queryClient.refetchQueries("pickAndBans");
      } catch (error) {
        console.error("Failed to update picks and bans on the server:", error);
      }
    }
  }, [
    banned,
    deathCount,
    filteredCharacters,
    firstCircleCount,
    firstPlayerNickname,
    player,
    queryClient,
    secondCircleCount,
    uid,
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  // const filteredCharacters = data.characters.filter(
  //   (character: CharacterData) =>
  //     picked.some((pickedCharacter) => pickedCharacter.id === character.id),
  // );

  console.log(`filteredCharacters for uid: ${uid}: `, filteredCharacters);

  return (
    <StyledPickAndBanContainer currentPlayer={player}>
      <StyledUserNickname playerForStyle={player}>
        <StyledFirstNickname>
          {firstPlayerNickname.toUpperCase()}
        </StyledFirstNickname>
        <PlusSection>+</PlusSection>
        <StyledSecondNickname>
          {secondPlayerNickname.toUpperCase()}
        </StyledSecondNickname>
      </StyledUserNickname>
      <BanAndPickContainer currentPlayer={player}>
        <StyledTextContainer currentPlayerForStyle={player}>
          <StyledVariable>
            <div>
              <StyledPickText>total cost</StyledPickText>
              <StyledPickCost>{playerTotalCost}</StyledPickCost>
            </div>
            <StyledPickText>first room</StyledPickText>
            <StyledInputSection currentPlayerForStyle={player}>
              <StyledPickCost>{firstCircleCount}</StyledPickCost>
              <div>
                <p className="text-white/55 text-[9px]">First circles:</p>
                <PlayerInput
                  type={"number"}
                  onChange={(e) => setFirstCircleCount(Number(e.target.value))}
                />
              </div>
            </StyledInputSection>
            <div>
              <StyledPickText>second room</StyledPickText>
              <StyledInputSection currentPlayerForStyle={player}>
                <StyledPickCost>{secondCircleCount}</StyledPickCost>
                <div>
                  <p className="text-white/55 text-[9px]">Second circles:</p>
                  <PlayerInput
                    type={"number"}
                    onChange={(e) =>
                      setSecondCircleCount(Number(e.target.value))
                    }
                  />
                </div>
              </StyledInputSection>
            </div>
            <div>
              <StyledPickText>overtime</StyledPickText>
              <StyledInputSection currentPlayerForStyle={player}>
                <StyledPickCost>{deathCount}</StyledPickCost>
                <div>
                  <p className="text-white/55 text-[9px]">Overtime:</p>
                  <PlayerInput
                    type={"number"}
                    onChange={(e) => setDeathCountCount(Number(e.target.value))}
                  />
                </div>
              </StyledInputSection>
            </div>
            <StyledUpdatePlayerData onClick={() => updateDataForPlayers()}>
              Update data
            </StyledUpdatePlayerData>
          </StyledVariable>
          <div>
            <StyledPickResultText>cycles penalty</StyledPickResultText>
            <StyledPickResult>{penaltyCircles.toFixed(4)}</StyledPickResult>
          </div>
        </StyledTextContainer>
        <PickSection currentPlayer={player}>
          {filteredCharacters.map((character: CharacterData, index) => (
            <CharacterCard
              index={index}
              playerForStyle={player}
              key={character.id}
              character={character}
              userUid={uid}
              setFilteredCharacters={setFilteredCharacters}
              updateDataForPlayers={updateDataForPlayers}
            />
          ))}
        </PickSection>
      </BanAndPickContainer>
    </StyledPickAndBanContainer>
  );
};

const StyledUpdatePlayerData = styled.button`
  background-color: #000000;
  color: #ffffff;

  border-radius: 10px;
  height: 30px;

  &:hover {
    transition: 0.4s;
    background-color: #3b373b;
  }
`;

const StyledInputSection = styled.div<{ currentPlayerForStyle: number }>`
  display: flex;
  flex-direction: ${({ currentPlayerForStyle }) =>
    currentPlayerForStyle === 1 ? "row" : "row-reverse"};

  align-items: center;
`;

const StyledFlexStart = styled.div<{ currentPlayerForStyle: number }>`
  display: flex;
  justify-content: ${({ currentPlayerForStyle }) =>
    currentPlayerForStyle === 1 ? "flex-end" : "flex-end"};
`;

const StyledCharacterConeContainer = styled.div``;

const StyledCharacterAndConeSection = styled.div<{
  currentPlayerForStyled: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${({ currentPlayerForStyled }) =>
    currentPlayerForStyled === 1 ? "flex-end" : "flex-start"};
  position: relative;

  margin-bottom: 5px;
`;

const StyledTextContainer = styled.div<{ currentPlayerForStyle: number }>`
  display: flex;
  flex-direction: column;

  justify-content: space-between;

  color: #ffffff;

  text-align: ${({ currentPlayerForStyle }) =>
    currentPlayerForStyle === 1 ? "left" : "right"};
`;

const StyledVariable = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;

  margin-top: 15%;
`;

const StyledPickText = styled.div`
  font-size: 24px;
  font-weight: 500;
  opacity: 80%;
`;

const StyledPickCost = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const StyledPickResultText = styled.div`
  font-size: 24px;
  font-weight: 500;
`;

const StyledPickResult = styled.div`
  font-size: 70px;
  font-weight: 700;
`;

const StyledCharactersCard = styled(CharactersCard)<{
  playerForStyle: number;
  index: number;
}>`
  display: flex;
  justify-content: space-between;
`;

const StyledCharacterCost = styled(CharacterCost)`
  transform: translate(15%, -200%);

  font-size: 20px;

  background-color: #000000;
  padding: 2px;
`;

const StyledRow = styled.div<{ playerForStyle: number }>`
  background-color: ${(props) =>
    props.playerForStyle === 1 ? "#ffa8a3" : "#acafff"};
  width: 100%;
  height: 2px;

  margin-top: 17px;
  margin-bottom: 13px;
  margin-left: -10px;
`;

const StyledUserNickname = styled.div<{ playerForStyle: number }>`
  display: flex;

  font-weight: bold;

  justify-content: ${({ playerForStyle }) =>
    playerForStyle === 1 ? "flex-start" : "flex-end"};
  align-content: center;

  margin-left: ${({ playerForStyle }) => (playerForStyle === 1 ? "3%" : "0%")};
  margin-right: ${({ playerForStyle }) => (playerForStyle === 1 ? "0%" : "3%")};
`;

const StyledFirstNickname = styled.div`
  color: #000000;

  align-self: center;
  font-size: 24px;

  margin-right: 2%;
`;

const StyledSecondNickname = styled.div`
  color: #ffffff;

  align-self: center;

  font-size: 24px;

  margin-left: 2%;
`;

const StyledCharacterCone = styled(ConesForCharacters)<{
  playerForStyle: number;
}>`
  //position: absolute;
  //
  //margin-top: 0;
  //margin-left: 0;
  //
  //transform: translate(150%, -60%);

  //position: absolute;
  //
  //margin-top: 0;
  //margin-left: 0;
  //
  //width: 70px;
  //height: 70px;
  //
  //transform: translate(85%, -80%);
  border-top-left-radius: ${({ playerForStyle }) =>
    playerForStyle === 1 && "10px"};
  border-top-right-radius: ${({ playerForStyle }) =>
    playerForStyle === 2 && "10px"};
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  border: 2px solid #fff;

  margin-top: 0;
  margin-right: 10px;

  width: 120px;
  height: 60px;

  //transform: translate(85%, -80%);

  box-shadow: 0 5px 45px rgba(0, 0, 150, 0.1);

  //border-bottom-left-radius: 5px;
  //border-bottom-right-radius: 5px;

  //box-shadow: 0 5px 45px rgba(0, 0, 150, 0.1);
`;

const roundAnimation = keyframes`
  0% {
    border-color: transparent transparent transparent green;
  }
  25% {
    border-color: transparent transparent green transparent;
  }
  50% {
    border-color: transparent green transparent transparent;
  }
  75% {
    border-color: green transparent transparent transparent;
  }
  100% {
    border-color: transparent transparent transparent green;
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(126, 255, 73, 6);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(116, 255, 118, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(116, 255, 118, 0);
  }
`;

const StyledCharactersBanCard = styled(CharacterCard)`
  margin: 0;
`;

const StyledCharacterCard = styled.img<{
  playerForStyle: number;
  characterRarity: number;
}>`
  width: 139px;
  height: 70px;

  border-top-left-radius: ${({ playerForStyle }) =>
    playerForStyle === 2 && "10px"};
  border-top-right-radius: ${({ playerForStyle }) =>
    playerForStyle === 1 && "10px"};

  border: 2px solid #fff;

  // background-color: {(props) =>
  //   props.characterRarity === 4
  //     ? "rgba(128, 0, 128, 0.25)"
  //     : "rgba(207,181,59, 0.25)"};
  backdrop-filter: blur(12px);
  //
  //border-top-left-radius: 8px;
  //border-top-right-radius: 8px;

  // box-shadow: 0px 0px 5px 2px
  //   {(props) =>
  //     props.characterRarity === 4 ? "#54458560" : "rgba(207,181,59, 0.25)"};
`;

const StyledPickAndBanContainer = styled.div<{ currentPlayer: number }>`
  //position: absolute;

  //--tw-translate-y: 50%;
  //transform: translate(var(--tw-translate-x), var(--tw-translate-y))
  //  rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
  //  scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  //
  //--tw-translate-x: 50%;

  //left: 50%;

  // top: {(props) => (props.currentPlayer === 1 ? "420px" : "700px")};

  // display: flex;
  // flex-direction: {({ currentPlayer }) =>
  //   currentPlayer === 1 ? "row-reverse" : "row"};

  align-self: center;

  background-color: ${({ currentPlayer }) =>
    currentPlayer === 1 ? "#31a8ff" : "#c84a32"};

  border-radius: 10px;
  margin-top: 4%;

  padding-bottom: 3%;
`;

const BanAndPickContainer = styled.section<{ currentPlayer: number }>`
  //gap: 25px;
  //width: 100%;
  //margin-left: ${(props) => (props.currentPlayer === 1 ? "50px" : "auto")};

  //margin-right: ${(props) => (props.currentPlayer === 2 ? "40%" : "auto")};

  //margin-bottom: 2%;
  //direction: ${(props) => (props.currentPlayer === 1 ? "rtl" : "ltr")};

  // transform: {({ currentPlayer }) =>
  //   currentPlayer === 1 ? "scaleX(-1)" : "none"};
  display: flex;
  justify-content: space-between;

  flex-direction: ${({ currentPlayer }) =>
    currentPlayer === 1 ? "row" : "row-reverse"};

  margin-left: ${({ currentPlayer }) => (currentPlayer === 1 ? "3%" : "9%")};
  margin-right: ${({ currentPlayer }) => (currentPlayer === 1 ? "9%" : "3%")};
`;

const RankForPickedOrBannedCharacters = styled(RankForCharacters)<{
  currentPlayer: number;
}>`
  position: absolute;

  z-index: 10;
  //margin-top: 3.9%;
  //margin-left: 0;

  transform: translate(580%, 100%);

  font-size: 20px;

  background-color: #000000;
  padding: 2px;
`;

const RankForPickedOrBannedCharacters2 = styled(RankForCharacters)<{
  currentPlayer: number;
}>`
  //margin-top: 3.9%;
  //margin-left: 0;
  --tw-backdrop-blur: blur(12px);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness)
    var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale)
    var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert)
    var(--tw-backdrop-opacity) var(--tw-backdrop-saturate)
    var(--tw-backdrop-sepia);

  z-index: 10;
  transform: translate(300%, -10%);

  font-size: 20px;
`;

const PickSection = styled.div<{ currentPlayer: number }>``;

const BanSection = styled.div<{ currentPlayer: number }>`
  position: absolute;

  display: flex;
  flex-direction: row;

  margin-bottom: 2rem;

  width: 208px;
  justify-content: space-between;

  > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(1rem * var(--tw-space-x-reverse));
    margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
  }

  --tw-grayscale: grayscale(100%);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast)
    var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate)
    var(--tw-sepia) var(--tw-drop-shadow);

  top: ${(props) => (props.currentPlayer === 1 ? "-110px" : "-389px")};
  left: ${(props) => (props.currentPlayer === 1 ? "785px" : "0")};
`;

const StyledPickedOrBannedCharacter = styled(CharacterImage)`
  height: 80px;
  width: 80px;

  border-radius: 50px;

  --tw-backdrop-blur: blur(12px);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness)
    var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale)
    var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert)
    var(--tw-backdrop-opacity) var(--tw-backdrop-saturate)
    var(--tw-backdrop-sepia);
`;

const StyledDefaultPicksOrBans = styled.div`
  height: 230px;
  width: 110px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(255 255 255 / 0.15);
  border-radius: 0.375rem /* 6px */;
  background-color: rgb(241 245 249 / 0.05);

  margin-right: 16px;

  --tw-backdrop-blur: blur(12px);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness)
    var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale)
    var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert)
    var(--tw-backdrop-opacity) var(--tw-backdrop-saturate)
    var(--tw-backdrop-sepia);
`;

const StyledDefaultPicksOrBans2 = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 50px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(255 255 255 / 0.15);
  background-color: rgb(241 245 249 / 0.05);
  --tw-backdrop-blur: blur(12px);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness)
    var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale)
    var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert)
    var(--tw-backdrop-opacity) var(--tw-backdrop-saturate)
    var(--tw-backdrop-sepia);
`;

const StyledAnimatedPicksOrBans = styled(StyledDefaultPicksOrBans)`
  animation: ${pulseAnimation} 1.5s infinite ease-in-out;
`;

const StyledAnimatedPicksOrBans2 = styled(StyledDefaultPicksOrBans2)`
  animation: ${pulseAnimation} 1.5s infinite ease-in-out;
`;

const StyledRankForCone = styled(RankForPickedOrBannedCharacters)`
  transform: translate(450%, 90%);

  font-size: 18px;
`;

const StyledConeCost = styled(StyledCharacterCost)`
  transform: translate(10%, -190%);

  font-size: 18px;
`;
