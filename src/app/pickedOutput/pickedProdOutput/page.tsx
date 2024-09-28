"use client";
import { useFetchPickAndBans } from "@/fetch/fetch";
import { useCharactersContext } from "@/context/useCharactersContext";
import { useEffect } from "react";
import {
  subscribeOnPickAndBanUpdates,
  unsubscribeFromUpdates,
} from "@/fetch/api/update/update";
import { FinalStageOutput } from "@/components/banAndPick/pick-and-ban/banAndPicksForOutput/FinalStageOutput";
import styled, { keyframes } from "styled-components";
import backgroundImage from "@/pic/bgimage.png";

const PickedProdOutput = () => {
  const { data, isLoading, isError, refetch } = useFetchPickAndBans();

  const {
    data: { globalStage },
  } = useCharactersContext();

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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const firstPlayer = data[0]?.firstPlayer || {};
  const secondPlayer = data[0]?.secondPlayer || {};
  const thirdPlayer = data[0]?.thirdPlayer || {};
  const fourthPlayer = data[0]?.fourthPlayer || {};

  return (
    <StyledPickOutputContainer>
      <FinalStageOutput
        globalStage={globalStage}
        player={firstPlayer}
        currentPlayer={1}
        firstUserNickname={firstPlayer.nickname}
        secondUserNickname={thirdPlayer.nickname}
        currentPlayerForStyle={1}
      />
      <StyledStarDiv>
        <AnimatedSVG
          width="439"
          height="405"
          viewBox="0 0 439 405"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_274_3114)">
            <path
              d="M213.025 75.8403L173.582 151.082C173.032 152.131 172.021 152.862 170.852 153.056L77.2563 168.562C74.1205 169.081 72.9866 173.004 75.3617 175.116L148.026 239.75C148.958 240.578 149.421 241.812 149.264 243.048L138.733 326.351C138.357 329.326 141.429 331.533 144.129 330.229L225.116 291.087C226.082 290.62 227.201 290.586 228.194 290.992L316.741 327.244C319.51 328.378 322.436 325.998 321.89 323.056L305.629 235.468C305.41 234.285 305.767 233.067 306.591 232.189L363.516 171.611C365.571 169.424 364.381 165.829 361.427 165.301L267.793 148.547C266.757 148.361 265.845 147.752 265.277 146.866L219.556 75.5551C217.991 73.1133 214.372 73.2714 213.025 75.8403Z"
              stroke="white"
              stroke-width="18.9025"
              shape-rendering="crispEdges"
            />
            <path
              d="M213.025 75.8403L173.582 151.082C173.032 152.131 172.021 152.862 170.852 153.056L77.2563 168.562C74.1205 169.081 72.9866 173.004 75.3617 175.116L148.026 239.75C148.958 240.578 149.421 241.812 149.264 243.048L138.733 326.351C138.357 329.326 141.429 331.533 144.129 330.229L225.116 291.087C226.082 290.62 227.201 290.586 228.194 290.992L316.741 327.244C319.51 328.378 322.436 325.998 321.89 323.056L305.629 235.468C305.41 234.285 305.767 233.067 306.591 232.189L363.516 171.611C365.571 169.424 364.381 165.829 361.427 165.301L267.793 148.547C266.757 148.361 265.845 147.752 265.277 146.866L219.556 75.5551C217.991 73.1133 214.372 73.2714 213.025 75.8403Z"
              stroke="black"
              stroke-opacity="0.2"
              stroke-width="18.9025"
              shape-rendering="crispEdges"
            />
          </g>
          <g filter="url(#filter1_d_274_3114)">
            <path
              d="M215.409 146.04L197.992 180.744C197.453 181.818 196.434 182.572 195.249 182.775L153.725 189.859C150.635 190.386 149.492 194.228 151.791 196.358L184.357 226.541C185.245 227.363 185.685 228.561 185.541 229.762L180.941 268.263C180.584 271.254 183.698 273.441 186.391 272.09L222.325 254.056C223.32 253.556 224.485 253.521 225.508 253.959L265.135 270.923C267.902 272.107 270.877 269.74 270.343 266.777L262.995 225.978C262.788 224.827 263.125 223.645 263.909 222.776L289.2 194.734C291.177 192.542 289.992 189.033 287.092 188.487L244.914 180.544C243.868 180.347 242.954 179.719 242.395 178.813L222.006 145.752C220.452 143.232 216.737 143.395 215.409 146.04Z"
              stroke="#FFC700"
              stroke-width="18.9025"
              shape-rendering="crispEdges"
            />
            <path
              d="M215.409 146.04L197.992 180.744C197.453 181.818 196.434 182.572 195.249 182.775L153.725 189.859C150.635 190.386 149.492 194.228 151.791 196.358L184.357 226.541C185.245 227.363 185.685 228.561 185.541 229.762L180.941 268.263C180.584 271.254 183.698 273.441 186.391 272.09L222.325 254.056C223.32 253.556 224.485 253.521 225.508 253.959L265.135 270.923C267.902 272.107 270.877 269.74 270.343 266.777L262.995 225.978C262.788 224.827 263.125 223.645 263.909 222.776L289.2 194.734C291.177 192.542 289.992 189.033 287.092 188.487L244.914 180.544C243.868 180.347 242.954 179.719 242.395 178.813L222.006 145.752C220.452 143.232 216.737 143.395 215.409 146.04Z"
              stroke="black"
              stroke-opacity="0.2"
              stroke-width="18.9025"
              shape-rendering="crispEdges"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_274_3114"
              x="0.361465"
              y="0.095108"
              width="437.912"
              height="404.253"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="32.1342" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 0.78 0 0 0 0 0 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_274_3114"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_274_3114"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_d_274_3114"
              x="76.8478"
              y="70.2357"
              width="287.057"
              height="276"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="32.1342" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 0.78 0 0 0 0 0 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_274_3114"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_274_3114"
                result="shape"
              />
            </filter>
          </defs>
        </AnimatedSVG>
      </StyledStarDiv>
      <FinalStageOutput
        globalStage={globalStage}
        player={secondPlayer}
        currentPlayer={2}
        firstUserNickname={secondPlayer.nickname}
        secondUserNickname={fourthPlayer.nickname}
        currentPlayerForStyle={2}
      />
    </StyledPickOutputContainer>
  );
};

export default PickedProdOutput;

const StyledPickOutputContainer = styled.div`
  display: grid;
  grid-template-columns: 42% 42%;
  grid-gap: 11%;
  grid-template-rows: auto;
  height: 100vh;
  justify-content: center;
  align-items: center;

  //font-family: "Barlow", sans-serif;

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

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
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

const StyledStarDiv = styled.div`
  position: absolute;
  z-index: 999;
  align-self: center;
  justify-self: center;
`;

const AnimatedSVG = styled.svg`
  animation: ${pulseAnimation} 1.5s infinite ease-in-out;
`;
