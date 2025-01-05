import { CharacterData } from "@/types/interface";
import { ICON_DEFAULT_URL } from "@/utils/ICON_DEFAULT_URL";
import {
  CharacterCard,
  CharacterCost,
  CharacterImage,
  CharactersCard,
  ConesForCharacters,
  PlayerInfoSection,
  PlusSection,
  RankForCharacters,
} from "@/styles/userStyles";
import styled, { keyframes } from "styled-components";
import React, { useEffect, useState } from "react";
import { freeCharacter } from "@/common/freeCharacter";
import { VerticalIndicator } from "@/components/VertecalArrow/VerticalIndicator";
import { calculateCost } from "@/utils/cost/calculateCost";
import { convertPngToJpg } from "@/utils/convertPngToJpg";
import { ScreenshotButton } from "@/components/screanShotButton/ScreenshotButton";

interface Props {
  currentPlayer: number;
  globalStage: "ban" | "pick" | "ended" | null;
  currentPlayerForStyle: number;
  firstUserNickname: string;
  secondUserNickname: string;
  player: {
    characters: CharacterData[];
    picked: CharacterData[];
    banned: CharacterData[];
    firstCircleCount: number;
    secondCircleCount: number;
    deathCount: number;
  };
}

export const FinalStageOutput = ({
  player,
  currentPlayerForStyle,
  currentPlayer,
  firstUserNickname,
  secondUserNickname,
}: Props) => {
  const [playerTotalCost, setPlayerTotalCost] = useState(0);
  const [penaltyCircles, setPenaltyCircles] = useState(0);
  const [firstCircleCount, setFirstCircleCount] = useState(0);
  const [secondCircleCount, setSecondCircleCount] = useState(0);
  const [deathCount, setDeathCountCount] = useState(0);

  const [imageSrcs, setImageSrcs] = useState<string[]>([]);

  const [charactersArray, setCharactersArray] = useState<CharacterData[]>([]);

  const emptyIcon = {
    id: "empty",
    rank: "",
    rarity: "",
    icon: null,
  };

  useEffect(() => {
    const mergedArray: CharacterData[] = [];
    let bannedIndex = 0;
    let pickedIndex = 0;

    if (player.banned[bannedIndex]) {
      mergedArray.push(player.banned[bannedIndex]);
      bannedIndex++;
    }

    for (let i = 0; i < 2; i++) {
      if (player.picked[pickedIndex]) {
        mergedArray.push(player.picked[pickedIndex]);
        pickedIndex++;
      }
    }

    if (player.banned[bannedIndex]) {
      mergedArray.push(player.banned[bannedIndex]);
      bannedIndex++;
    }

    for (let i = 0; i < 6; i++) {
      if (player.picked[pickedIndex]) {
        mergedArray.push(player.picked[pickedIndex]);
        pickedIndex++;
      }
    }

    setCharactersArray(mergedArray);
  }, [player.picked, player.banned]);

  const charactersIcons = Array.from({ length: 10 }, (_, i) =>
    charactersArray[i] ? charactersArray[i] : emptyIcon,
  );

  useEffect(() => {
    calculateCost({
      setTotalPickCost: setPlayerTotalCost,
      playerPickedCharactersOrCones: player.picked,
    });

    console.log(player.picked);
  }, [player.picked]);

  useEffect(() => {
    if (playerTotalCost <= 35) {
      setPenaltyCircles(
        player.firstCircleCount +
          player.secondCircleCount +
          (playerTotalCost - 35) / 10 +
          player.deathCount / 2,
      );

      console.log("first Player");
    } else if (playerTotalCost > 35) {
      setPenaltyCircles(
        player.firstCircleCount +
          player.secondCircleCount +
          (playerTotalCost - 35) / 5 +
          player.deathCount / 2,
      );

      console.log("first Player");
    }
  }, [
    playerTotalCost,
    player.firstCircleCount,
    player.secondCircleCount,
    player.deathCount,
  ]);

  useEffect(() => {
    const loadImages = async () => {
      const srcPromises = charactersArray.map((character) =>
        convertPngToJpg(
          `https://github.com/dxrks1dex/cone_prev/tree/main/conePictures/${character.lightCone?.id}.jpg`,
        ),
      );
      const images = await Promise.all(srcPromises);
      setImageSrcs(images);
    };
    loadImages();
  }, [charactersArray]);

  return (
    <StyledPickAndBanContainer currentPlayer={currentPlayerForStyle}>
      <StyledUserNickname playerForStyle={currentPlayerForStyle}>
        <StyledFirstNickname>{firstUserNickname}</StyledFirstNickname>
        <PlusSection>+</PlusSection>
        <StyledSecondNickname>{secondUserNickname}</StyledSecondNickname>
      </StyledUserNickname>
      <BanAndPickContainer currentPlayer={currentPlayerForStyle}>
        <StyledTextContainer currentPlayerForStyle={currentPlayerForStyle}>
          <StyledVariable>
            <div>
              <StyledPickText>total cost</StyledPickText>
              <StyledPickCost>{playerTotalCost}</StyledPickCost>
            </div>
            <div>
              <StyledPickText>first room</StyledPickText>
              <StyledPickCost>{player.firstCircleCount}</StyledPickCost>
            </div>
            <div>
              <StyledPickText>second room</StyledPickText>
              <StyledPickCost>{player.secondCircleCount}</StyledPickCost>
            </div>
            <div>
              <StyledPickText>overtime</StyledPickText>
              <StyledPickCost>{player.deathCount}</StyledPickCost>
            </div>
          </StyledVariable>
          <div>
            <StyledPickResultText>cycles penalty</StyledPickResultText>
            <StyledPickResult>{penaltyCircles.toFixed(4)}</StyledPickResult>
          </div>
        </StyledTextContainer>
        <PickSection currentPlayer={currentPlayerForStyle}>
          {charactersIcons.map((character, index) => (
            <StyledCharacterContainer key={index}>
              {character.icon && (
                <StyledCharacterAndConeSection
                  currentPlayerForStyled={currentPlayerForStyle}
                >
                  {currentPlayerForStyle === 1 && character.lightCone?.id && (
                    <StyledCharacterConeContainer
                      playerForStyle={currentPlayerForStyle}
                    >
                      <StyledRankForCone currentPlayer={currentPlayer}>
                        S{character.lightCone.rank + 1}
                      </StyledRankForCone>
                      <StyledCharacterCone
                        playerForStyle={currentPlayerForStyle}
                        src={`https://raw.githubusercontent.com/dxrks1dex/cone_prev/main/conePictures/second/${character.lightCone?.id}.jpg`}
                      />

                      <StyledConeCost currentPlayer={currentPlayerForStyle}>
                        {character.lightCone?.rank === 0
                          ? character.lightCone?.cost
                          : character.lightCone?.rankCost &&
                            character.lightCone?.rankCost[
                              character.lightCone.rank
                            ]}
                      </StyledConeCost>
                    </StyledCharacterConeContainer>
                  )}
                  <StyledCharactersCard playerForStyle={currentPlayerForStyle}>
                    <div>
                      {index === 0 || index === 3 ? null : (
                        <RankForPickedOrBannedCharacters
                          currentPlayer={currentPlayer}
                        >
                          E{character.rank}
                        </RankForPickedOrBannedCharacters>
                      )}
                      <StyledCharacterImageContainer
                        playerForStyle={currentPlayerForStyle}
                        characterRarity={character.rarity}
                      >
                        <StyledCharacterCard
                          characterId={character.id}
                          index={index}
                          playerForStyle={currentPlayerForStyle}
                          src={`${ICON_DEFAULT_URL}/${character.icon}`}
                          onError={(e) =>
                            (e.currentTarget.src = freeCharacter.icon)
                          }
                        />
                      </StyledCharacterImageContainer>
                      {index === 0 || index === 3 ? null : (
                        <StyledCharacterCost
                          currentPlayer={currentPlayerForStyle}
                        >
                          {character.rank === 0
                            ? character.cost
                            : character.rankCost[character.rank - 1]}
                        </StyledCharacterCost>
                      )}
                    </div>
                  </StyledCharactersCard>
                  {currentPlayerForStyle === 2 && character.lightCone?.id && (
                    <StyledCharacterConeContainer
                      playerForStyle={currentPlayerForStyle}
                    >
                      <StyledRankForCone currentPlayer={currentPlayer}>
                        S{character.lightCone.rank + 1}
                      </StyledRankForCone>
                      <StyledCharacterCone
                        playerForStyle={currentPlayerForStyle}
                        src={`https://raw.githubusercontent.com/dxrks1dex/cone_prev/main/conePictures/second/${character.lightCone?.id}.jpg`}
                      />

                      <StyledConeCost currentPlayer={currentPlayerForStyle}>
                        {character.lightCone?.rank === 0
                          ? character.lightCone?.cost
                          : character.lightCone?.rankCost &&
                            character.lightCone?.rankCost[
                              character.lightCone.rank
                            ]}
                      </StyledConeCost>
                    </StyledCharacterConeContainer>
                  )}
                </StyledCharacterAndConeSection>
              )}
            </StyledCharacterContainer>
          ))}
        </PickSection>
      </BanAndPickContainer>
      {/*<ScreenshotButton />*/}
    </StyledPickAndBanContainer>
  );
};

const StyledCharacterImageContainer = styled.div<{
  playerForStyle: number;
  characterRarity: number;
}>`
  width: 139px;
  height: 70px;

  border-top-left-radius: ${({ playerForStyle }) =>
    playerForStyle === 2 && "20px"};
  border-top-right-radius: ${({ playerForStyle }) =>
    playerForStyle === 1 && "20px"};

  border: 3px solid #fff;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      ${({ playerForStyle }) => (playerForStyle === 1 ? "#31a8ff" : "#c84a32")},
      rgba(0, 0, 0, 0) 75%
    );
    pointer-events: none; /* Чтобы затемнение не перекрывало интерактивность */
    z-index: 89;
    filter: blur(0px);
  }

  &::before {
    left: 0;
    filter: blur(0px);
  }

  &::after {
    right: 0;
    background: linear-gradient(
      to left,
      ${({ playerForStyle }) => (playerForStyle === 1 ? "#31a8ff" : "#c84a32")},
      rgba(0, 0, 0, 0) 75%
    );
    filter: blur(0px);
  }

  backdrop-filter: blur(12px);
`;

const StyledCharacterContainer = styled.div`
  margin-bottom: 3%;
`;

const StyledFlexStart = styled.div<{ currentPlayerForStyle: number }>`
  display: flex;
  justify-content: ${({ currentPlayerForStyle }) =>
    currentPlayerForStyle === 1 ? "flex-end" : "flex-end"};
`;

const StyledCharacterConeContainer = styled.div<{ playerForStyle: number }>`
  margin-right: ${({ playerForStyle }) => playerForStyle === 1 && "10px"};
  margin-left: ${({ playerForStyle }) => playerForStyle === 2 && "15px"};

  margin-bottom: ${({ playerForStyle }) => playerForStyle === 1 && "-1px"};
`;

const StyledCharacterAndConeSection = styled.div<{
  currentPlayerForStyled: number;
}>`
  display: flex;
  align-items: end;
  justify-content: ${({ currentPlayerForStyled }) =>
    currentPlayerForStyled === 1 ? "flex-end" : "flex-start"};
  position: relative;

  margin-bottom: 6px;
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
  font-size: 32px;
  font-weight: 400;
  opacity: 80%;

  margin-bottom: -10px;
`;

const StyledPickCost = styled.div`
  font-size: 32px;

  font-weight: 700;
`;

const StyledPickResultText = styled.div`
  font-size: 46px;

  font-weight: 500;

  margin-bottom: -40px;
`;

const StyledPickResult = styled.div`
  font-size: 120px;
  font-weight: 700;

  margin-bottom: -30px;
`;

const StyledCharactersCard = styled(CharactersCard)<{
  playerForStyle: number;
}>`
  display: flex;
  justify-content: space-between;

  margin-right: 0;

  svg {
    filter: none;
  }
`;
//  ${({ currentPlayer }) =>
//     currentPlayer === 1 ? "translate(15%, -200%)" : "translate(10%, -200%)"};
const StyledCharacterCost = styled(CharacterCost)<{ currentPlayer: number }>`
  font-size: 20px;
  font-weight: 600;

  transform: ${({ currentPlayer }) =>
    currentPlayer === 1 ? "translate(15%, -245%)" : "translate(215%, -245%)"};

  display: flex;
  flex-direction: ${({ currentPlayer }) =>
    currentPlayer === 1
      ? "row"
      : "row-reverse"}; /* Направление для игрока 2 справа налево */
  // align-items: {({ currentPlayer }) =>
  //   currentPlayer === 1 ? "flex-start" : "flex-end"};

  height: 26px;
  align-items: center;
  width: 42px;

  background-color: #000000;
  //padding: 2px;
  padding-left: 2px;
  padding-right: 2px;
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

  margin-top: 2%;

  margin-left: ${({ playerForStyle }) => (playerForStyle === 1 ? "3%" : "0%")};
  margin-right: ${({ playerForStyle }) => (playerForStyle === 1 ? "0%" : "3%")};
`;

const StyledFirstNickname = styled.div`
  color: #000000;

  align-self: center;
  font-size: 32px;

  margin-right: 2%;
`;

const StyledSecondNickname = styled.div`
  color: #ffffff;

  align-self: center;

  font-size: 32px;

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
    playerForStyle === 1 && "20px"};
  border-top-right-radius: ${({ playerForStyle }) =>
    playerForStyle === 2 && "20px"};
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  border: 2px solid #fff;

  margin-top: 0;

  width: 120px;
  height: 60px;

  //transform: translate(85%, -80%);

  box-shadow: 0 5px 45px rgba(0, 0, 150, 0.1);

  //border-bottom-left-radius: 5px;
  //border-bottom-right-radius: 5px;

  //box-shadow: 0 5px 45px rgba(0, 0, 150, 0.1);

  object-fit: cover;
  //object-position: top;
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
  index: number;
  characterId: string;
}>`
  width: 116px;
  height: 98px;
  //width: 100%;

  border: none;

  object-fit: ${({ characterId }) => characterId === "0" && "contain"};

  filter: ${({ index }) =>
    index === 0 || index === 3 ? "grayscale(100%)" : "none"};

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

//     ${({ currentPlayer }) =>
//     currentPlayer === 1 ? "translate(300%, 100%)" : "translate(10%, 100%)"};
const RankForPickedOrBannedCharacters = styled(RankForCharacters)<{
  currentPlayer: number;
}>`
  position: absolute;

  z-index: 10;
  //margin-top: 3.9%;
  //margin-left: 0;

  transform: ${({ currentPlayer }) =>
    currentPlayer === 1 ? "translate(290%, 145%)" : "translate(20%, 145%)"};

  font-size: 20px;
  font-weight: 600;

  height: 26px;

  align-items: center;
  justify-content: center;

  width: 34px;
  background-color: #000000;
  //padding: 2px;
  padding-left: 2px;
  padding-right: 2px;
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

  //margin-right: 16px;

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

const StyledRankForCone = styled(RankForPickedOrBannedCharacters)<{
  currentPlayer: number;
}>`
  transform: ${({ currentPlayer }) =>
    currentPlayer === 1 ? "translate(10%, 115%)" : "translate(300%, 115%)"};

  font-size: 16px;

  width: 28px;
`;

const StyledConeCost = styled(StyledCharacterCost)`
  transform: ${({ currentPlayer }) =>
    currentPlayer === 1 ? "translate(230%, -210%)" : "translate(10%, -210%)"};

  font-size: 16px;

  width: 34px;
`;
