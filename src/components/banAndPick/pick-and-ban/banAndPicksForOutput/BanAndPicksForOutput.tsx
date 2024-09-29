import { CharacterData } from "@/types/interface";
import { ICON_DEFAULT_URL } from "@/utils/ICON_DEFAULT_URL";
import {
  CharacterCard,
  CharacterCost,
  CharacterImage,
  CharactersCard,
  ConesForCharacters,
  RankForCharacters,
} from "@/styles/userStyles";
import styled, { keyframes } from "styled-components";
import React, { useEffect, useState } from "react";
import { freeCharacter } from "@/common/freeCharacter";
import { useTimerContext } from "@/context/useTimerContext";

interface Props {
  currentPlayer: number;
  currentStage: "ban" | "pick" | null;
  globalStage: "ban" | "pick" | "ended" | null;
  currentPlayerForStyle: number;
  userNickname: string;
  isPickOrBan: boolean;
  player: {
    characters: CharacterData[];
    picked: CharacterData[];
    banned: CharacterData[];
  };
  mainTimer: number;
}

export const BanAndPicksForOutput = ({
  player,
  currentPlayerForStyle,
  currentStage,
  currentPlayer,
  userNickname,
  globalStage,
  isPickOrBan,
}: Props) => {
  const [charactersArray, setCharactersArray] = useState<CharacterData[]>([]);
  const [timerColor, setTimerColor] = useState("white");
  const [pulseColor, setPulseColor] = useState("#e4dac3");

  const {
    data: { mainTimer },
    operations: { setMainTimer },
  } = useTimerContext();

  const emptyIcon = {
    id: "empty",
    rank: "",
    rarity: "",
    icon: null,
  };
  useEffect(() => {
    if (isPickOrBan) {
      const pickTime = setInterval(() => {
        setMainTimer((prevSeconds) => prevSeconds - 1);
      }, 1000);

      if (mainTimer === 0) {
        clearInterval(pickTime);
      }

      return () => clearInterval(pickTime);
    }
  }, [isPickOrBan, setMainTimer, mainTimer]);

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

  useEffect(() => {
    if (mainTimer <= 5) {
      setTimerColor("#C84A32");
      setPulseColor("#C84A32");
    } else {
      setTimerColor("white");
      setPulseColor("#e4dac3");
    }
  }, [mainTimer]);

  const bannedIcons = Array.from({ length: 2 }, (_, i) =>
    player.banned[i] ? player.banned[i] : emptyIcon,
  );
  const pickedIcons = Array.from({ length: 8 }, (_, i) =>
    player.picked[i] ? player.picked[i] : emptyIcon,
  );

  const charactersIcons = Array.from({ length: 10 }, (_, i) =>
    charactersArray[i] ? charactersArray[i] : emptyIcon,
  );

  return (
    <StyledPickAndBanContainer currentPlayer={currentPlayerForStyle}>
      <BanAndPickContainer currentPlayer={currentPlayerForStyle}>
        <BanSection currentPlayer={currentPlayerForStyle}>
          {charactersIcons.map((character, index) => (
            <div key={index}>
              {character.icon ? (
                <StyledCharactersBanCard
                  index={index}
                  playerForStyle={currentPlayerForStyle}
                >
                  {/*<RankForPickedOrBannedCharacters2*/}
                  {/*  currentPlayer={currentPlayer}*/}
                  {/*>*/}
                  {/*  {character.rank}*/}
                  {/*</RankForPickedOrBannedCharacters2>*/}
                  <StyledCharacterImageContainer
                    playerForStyle={currentPlayerForStyle}
                    index={index}
                  >
                    <StyledPickedOrBannedCharacter
                      index={index}
                      playerForStyle={currentPlayerForStyle}
                      characterRarity={character.rarity}
                      src={`${ICON_DEFAULT_URL}/${character.icon}`}
                      onError={(e) =>
                        (e.currentTarget.src = freeCharacter.icon)
                      }
                    />
                  </StyledCharacterImageContainer>
                  <StyledCharacterOperationContainer
                    playerForStyle={currentPlayerForStyle}
                  >
                    <svg
                      width="21"
                      height="42"
                      viewBox="0 0 21 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 0C9.40202 0 0 9.40202 0 21C0 32.598 9.40202 42 21 42V0Z"
                        fill={`${index === 0 || index === 3 ? "#E31D1D" : "#18FFCB"}`}
                      />
                    </svg>
                  </StyledCharacterOperationContainer>
                </StyledCharactersBanCard>
              ) : currentPlayerForStyle !== currentPlayer &&
                globalStage !== "pick" &&
                (index === 0 || (index === 3 && player.banned.length === 1)) ? (
                <StyledAnimatedPicksOrBans
                  colour={pulseColor}
                  playerForStyle={currentPlayerForStyle}
                >
                  <div className="flex mb-1">
                    <StyledTimerSection>
                      <div className="mt-0.5">
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
                            fill={timerColor}
                          />
                        </svg>
                      </div>
                      <StyledTimerText timerColor={timerColor}>
                        {mainTimer}
                      </StyledTimerText>
                    </StyledTimerSection>
                  </div>
                  <div className="mb-1">ban</div>
                </StyledAnimatedPicksOrBans>
              ) : currentPlayerForStyle === currentPlayer &&
                currentStage === "pick" &&
                globalStage === "pick" &&
                index === player.picked.length + player.banned.length ? (
                <StyledAnimatedPicksOrBans
                  colour={pulseColor}
                  playerForStyle={currentPlayerForStyle}
                >
                  <div className="flex mb-1">
                    <StyledTimerSection>
                      <div className="mb-0.5">
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
                            fill={timerColor}
                          />
                        </svg>
                      </div>
                      <StyledTimerText timerColor={timerColor}>
                        {mainTimer}
                      </StyledTimerText>
                    </StyledTimerSection>
                  </div>
                  <div className="mb-1">pick</div>
                </StyledAnimatedPicksOrBans>
              ) : (
                <StyledDefaultPicksOrBans
                  playerForStyle={currentPlayerForStyle}
                >
                  {/*{index + 1}*/}
                </StyledDefaultPicksOrBans>
              )}
            </div>
          ))}
        </BanSection>
      </BanAndPickContainer>
    </StyledPickAndBanContainer>
  );
};

const StyledCharacterOperationContainer = styled.div<{
  playerForStyle: number;
}>`
  position: absolute;
  transform: ${({ playerForStyle }) =>
    playerForStyle === 2 ? "scaleX(-1)" : "none"};
  //top: 0;
  margin-left: ${({ playerForStyle }) => (playerForStyle === 1 ? "8%" : "-8%")};
`;

const StyledCharacterImageContainer = styled.div<{
  playerForStyle: number;
  index: number;
}>`
  height: 79px;
  width: 158px;
  border: 3px solid white;

  --tw-backdrop-blur: blur(12px);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness)
    var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale)
    var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert)
    var(--tw-backdrop-opacity) var(--tw-backdrop-saturate)
    var(--tw-backdrop-sepia);

  border-top-left-radius: ${({ playerForStyle }) =>
    playerForStyle === 1 ? "20px" : "0px"};
  border-top-right-radius: ${({ playerForStyle }) =>
    playerForStyle === 2 ? "20px" : "0xpx"};
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.9) 0px 18px 36px -18px inset;

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
    background: linear-gradient(to left, #483d2b, rgba(0, 0, 0, 0) 55%);
    pointer-events: none; /* Чтобы затемнение не перекрывало интерактивность */
    z-index: 89;
    filter: blur(0px);
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, #483d2b, rgba(0, 0, 0, 0) 55%);

    filter: blur(0px);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, #483d2b rgba(0, 0, 0, 0) 75%);
    filter: blur(0px);
  }
`;

const StyledTimerText = styled.div<{ timerColor: string }>`
  font-size: 30px;

  color: ${({ timerColor }) => timerColor};

  padding-left: 5px;
`;

const StyledCharactersOperationSvg = styled.svg<{
  playerForStyle: number;
  stage: "pick" | "ban";
}>`
  z-index: 99;
  position: absolute;
  display: flex;

  flex-direction: ${({ playerForStyle }) =>
    playerForStyle === 1 ? "row-reverse" : "row-reverse"};

  path {
    fill: ${({ stage }) => (stage === "ban" ? "#E31D1D" : "#00FF00")};
  }
`;

const StyledArrowContainer = styled.div`
  background-color: #acafff;
  height: 10px;

  width: 40px;
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

const StyledPlayerBanAndPick = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledUserNickname = styled.div<{ playerForStyle: number }>`
  writing-mode: vertical-lr;
  text-orientation: upright;

  //margin-right: 10px;
  //margin-left: 10px

  color: ${(props) => (props.playerForStyle === 1 ? "#ffa8a3" : "#acafff")};

  justify-self: center;
  align-self: center;

  //height: 250px;
  height: 235px;

  word-break: break-word;
  white-space: normal;
  overflow: hidden;

  position: absolute;

  right: ${(props) => (props.playerForStyle === 1 ? "auto" : "0")};
  left: ${(props) => (props.playerForStyle === 1 ? "0" : "auto")};

  transform: ${(props) =>
    props.playerForStyle === 1 ? "translateX(-160%)" : "translateX(100%)"};
`;

const pulseAnimation = (colour: string) => keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 ${colour};
  }
//rgba(255, 255, 255, 0.6)
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(116, 255, 118, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(116, 255, 118, 0);
  }
`;

// const StyledArrowAnimateContainer = styled.div`
//   background-color: #acafff;
//   height: 10px;
//
//   width: 50px;
//
//   animation: ${pulseAnimation} 1.5s infinite ease-in-out;
// `;

const StyledCharactersBanCard = styled(CharacterCard)<{
  playerForStyle: number;
  index: number;
}>`
  //width: 100px;
  //height: 100px;
  //position: relative;
  //margin: 10px 0;
  //border: 2px solid black;
  //filter: {({ isDisabled }) => (isDisabled ? "grayscale(100%)" : "none")};
  border-top-left-radius: ${({ playerForStyle }) =>
    playerForStyle === 1 && "10px"};
  border-top-right-radius: ${({ playerForStyle }) =>
    playerForStyle === 2 && "10px"};

  // filter: {({ index }) =>
  //   index === 0 || index === 3 ? "grayscale(100%)" : "none"};

  svg {
    filter: none;
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCharacterCost = styled(CharacterCost)`
  transform: translate(0%, -780%);

  font-size: 20px;
`;

const StyledCharacterCard = styled.img<{
  characterRarity: number;
  playerForStyle: number;
}>`
  width: 60px;
  height: 60px;

  background-color: ${(props) =>
    props.characterRarity === 4
      ? "rgba(128, 0, 128, 0.25)"
      : "rgba(207,181,59, 0.25)"};
  backdrop-filter: blur(12px);

  //border-radius: 50px;

  box-shadow: 0px 0px 5px 2px
    ${(props) =>
      props.characterRarity === 4 ? "#54458560" : "rgba(207,181,59, 0.25)"};

  border-top-left-radius: ${({ playerForStyle }) =>
    playerForStyle === 1 && "10px"};
  border-top-right-radius: ${({ playerForStyle }) =>
    playerForStyle === 2 && "10px"};
`;

const StyledPickAndBanContainer = styled.div<{ currentPlayer: number }>`
  //position: absolute;
  // --tw-translate-y: -50%;
  // transform: translate(var(--tw-translate-x), var(--tw-translate-y))
  //   rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
  //   scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  //
  // --tw-translate-x: -50%;
  //
  // left: 50%;
  //// top: ${(props) => (props.currentPlayer === 1 ? "420px" : "700px")};
`;

const StyledCharacterCone = styled(ConesForCharacters)<{
  currentPlayer: number;
}>`
  position: absolute;

  margin-top: 0;
  margin-left: 0;

  transform: translate(150%, -60%);
`;

const BanAndPickContainer = styled.section<{ currentPlayer: number }>`
  //gap: 25px;
  //width: 100%;
  margin-left: ${(props) => (props.currentPlayer === 1 ? "45%" : "-45%")};

  //margin-bottom: 2%;
  //direction: ${(props) => (props.currentPlayer === 1 ? "rtl" : "ltr")};

  //display: flex;
  //flex-direction: column;
`;

const RankForPickedOrBannedCharacters = styled(RankForCharacters)<{
  currentPlayer: number;
}>`
  position: absolute;

  z-index: 10;
  //margin-top: 3.9%;
  //margin-left: 0;

  transform: translate(460%, 3%);

  font-size: 20px;
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

const StyledPickSection = styled.div<{ currentPlayer: number }>`
  display: flex;
  flex-direction: column;

  gap: 10px;
  //flex-direction: {(props) =>
  //  props.currentPlayer === 1 ? "row" : "row-reverse"};
`;

const BanSection = styled.div<{ currentPlayer: number }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  width: 208px;
  justify-content: space-between;
  align-items: center;

  gap: 12px;

  //> :not([hidden]) ~ :not([hidden]) {
  //  --tw-space-x-reverse: 0;
  //  margin-right: calc(1rem * var(--tw-space-x-reverse));
  //  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
  //}
  //
  //img {
  //  filter: grayscale(100%);
  //}
  //
  //.pulse-animation {
  //  animation: pulse 1.5s infinite;
  //  background-color: yellow;
  //}
  //
  //@keyframes pulse {
  //  0% {
  //    transform: scale(1);
  //    opacity: 1;
  //  }
  //  50% {
  //    transform: scale(1.1);
  //    opacity: 0.7;
  //  }
  //  100% {
  //    transform: scale(1);
  //    opacity: 1;
  //  }
  //}

  // margin-left: ${(props) => (props.currentPlayer === 1 ? "63%" : "0")};
`;

const StyledPickedOrBannedCharacter = styled(CharacterImage)<{
  playerForStyle: number;
  characterRarity: number;
  index: number;
}>`
  height: 110px;
  width: 132px;

  //--tw-backdrop-blur: blur(12px);
  //backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness)
  //  var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale)
  //  var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert)
  //  var(--tw-backdrop-opacity) var(--tw-backdrop-saturate)
  //  var(--tw-backdrop-sepia);

  border-top-left-radius: ${({ playerForStyle }) =>
    playerForStyle === 1 ? "20px" : "0px"};
  border-top-right-radius: ${({ playerForStyle }) =>
    playerForStyle === 2 ? "20px" : "0xpx"};
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  filter: ${({ index }) =>
    index === 0 || index === 3 ? "grayscale(100%)" : "none"};

  object-fit: cover;
  object-position: top;
`;

const StyledTimerSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDefaultPicksOrBans = styled.div<{ playerForStyle: number }>`
  height: 79px;
  width: 158px;
  border: 3px solid rgb(255 255 255 / 0.15);
  //border-style: solid;
  //border-width: 1px;
  //border-color: rgb(255 255 255 / 0.15);
  //border-radius: 50px /* 6px */;
  background-color: rgb(241 245 249 / 0.05);

  //margin-right: 16px;

  --tw-backdrop-blur: blur(12px);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness)
    var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale)
    var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert)
    var(--tw-backdrop-opacity) var(--tw-backdrop-saturate)
    var(--tw-backdrop-sepia);

  border-top-left-radius: ${({ playerForStyle }) =>
    playerForStyle === 1 && "20px"};
  border-top-right-radius: ${({ playerForStyle }) =>
    playerForStyle === 2 && "20px"};

  color: snow;
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ playerForStyle }) =>
    playerForStyle === 1 ? "row-reverse" : "row"};
  align-items: end;

  padding-right: 10px;
  padding-left: 10px;

  font-size: 25px;
`;

const StyledDefaultPicksOrBansForBan = styled.div`
  height: 60px;
  width: 158px;
  border: 3px solid rgb(255 255 255 / 0.15);

  //border-radius: 50px;
  //border-style: solid;
  //border-width: 1px;
  //border-color: rgb(255 255 255 / 0.15);
  background-color: rgb(241 245 249 / 0.05);

  --tw-backdrop-blur: blur(12px);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness)
    var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale)
    var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert)
    var(--tw-backdrop-opacity) var(--tw-backdrop-saturate)
    var(--tw-backdrop-sepia);
`;

const rotate = keyframes`  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }`;

const StyledAnimatedPicksOrBans = styled(StyledDefaultPicksOrBans)<{
  colour: string;
}>`
  border: 3px solid ${({ colour }) => colour};

  //::before {#e4dac3
  animation: ${({ colour }) => pulseAnimation(colour)} 1.5s infinite ease-in-out;
  //}
`;
