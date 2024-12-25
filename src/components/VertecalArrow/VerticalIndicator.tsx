import styled from "styled-components";
import { useEffect, useState } from "react";
import { useFetchPickAndBans, useGetAllPickAndBansById } from "@/fetch/fetch";
import { CharacterData } from "@/types/interface";
import {
  subscribeOnPickAndBanUpdates,
  unsubscribeFromUpdates,
} from "@/fetch/api/update/update";

interface IPlayerData {
  characters: CharacterData[];
  picked: CharacterData[];
  banned: CharacterData[];
  firstCircleCount: number;
  secondCircleCount: number;
  deathCount: number;
  stage: "pick" | "ban" | null;
  uid: string | null;
  nickname: string;
}

export function VerticalIndicator({ gameId }: { gameId: string | null }) {
  const { data, isLoading, refetch } = useGetAllPickAndBansById(gameId);
  useEffect(() => {
    const handleUpdate = () => {
      refetch();
    };

    const unsubscribe = subscribeOnPickAndBanUpdates(handleUpdate);

    return () => {
      unsubscribeFromUpdates();
    };
  }, [refetch]);

  const [items, setItems] = useState<CharacterData[]>([]);

  const [firstPlayerPickedLength, setFirstPlayerPickedLength] = useState(0);
  const [secondPlayerPickedLength, setSecondPlayerPickedLength] = useState(0);

  const [firstPlayerBannedLength, setFirstPlayerBannedLength] = useState(0);
  const [secondPlayerBannedLength, setSecondPlayerBannedLength] = useState(0);

  // const firstPlayer = data[0]?.firstPlayer || {};
  // const secondPlayer = data[0]?.secondPlayer || {};

  useEffect(() => {
    if (data && !isLoading) {
      const firstPlayer = data?.firstPlayer || {};
      const secondPlayer = data?.secondPlayer || {};

      const combinedPicks = [
        ...(firstPlayer.picked || []),
        ...(secondPlayer.picked || []),
        ...(firstPlayer.banned || []),
        ...(secondPlayer.banned || []),
      ];

      setFirstPlayerPickedLength(firstPlayer.picked.length);
      setSecondPlayerPickedLength(secondPlayer.picked.length);

      setFirstPlayerBannedLength(firstPlayer.banned.length);
      setSecondPlayerBannedLength(secondPlayer.banned.length);
      setItems(combinedPicks);
    }
  }, [data, isLoading]);

  // if (!firstPlayerPickedLength)
  //   return <div>firstPlayerPickedLength Loading...</div>;
  //
  // if (!secondPlayerPickedLength)
  //   return <div>secondPlayerPickedLength Loading...</div>;

  const isLarge = true;

  if (isLoading) return <div>Loading...</div>;

  return (
    <LineDiv>
      <SVGContainer>
        <svg
          width="124"
          height="908"
          viewBox="0 0 124 908"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_353_3115)">
            <rect
              opacity={
                firstPlayerPickedLength === 0 && secondPlayerBannedLength === 1
                  ? "1"
                  : firstPlayerPickedLength >= 1
                    ? "1"
                    : "0.3"
              }
              x="58"
              y="78"
              width="6"
              height={firstPlayerPickedLength >= 1 ? "46" : "45"}
              fill="#18FFCB"
            />

            <rect
              opacity={
                firstPlayerPickedLength === 1 && secondPlayerPickedLength === 0
                  ? "1"
                  : firstPlayerPickedLength >= 1
                    ? "1"
                    : "0.3"
              }
              x="58"
              y="123"
              width="6"
              height={firstPlayerPickedLength >= 1 ? "38" : "36"}
              fill="#18FFCB"
            />

            <rect
              opacity={
                firstPlayerPickedLength === 1 && secondPlayerPickedLength === 1
                  ? "1"
                  : secondPlayerPickedLength >= 2
                    ? "1"
                    : "0.3"
              }
              x="58"
              y="159"
              width="6"
              height={secondPlayerPickedLength >= 2 ? "58" : "57"}
              fill="#18FFCB"
            />

            <rect
              opacity={
                firstPlayerPickedLength === 1 && secondPlayerPickedLength === 2
                  ? "1"
                  : firstPlayerPickedLength >= 2
                    ? "1"
                    : "0.3"
              }
              x="58"
              y="216"
              width="6"
              height={firstPlayerPickedLength >= 2 ? "58" : "57"}
              fill="#18FFCB"
            />

            <rect
              opacity={
                firstPlayerBannedLength === 2 && secondPlayerPickedLength === 2
                  ? "1"
                  : secondPlayerPickedLength >= 3
                    ? "1"
                    : "0.3"
              }
              x="58"
              y="349"
              width="6"
              height={secondPlayerPickedLength >= 3 ? "50" : "49"}
              fill="#18FFCB"
            />

            <rect
              opacity={
                firstPlayerBannedLength === 2 &&
                secondPlayerPickedLength === 3 &&
                firstPlayerPickedLength < 3
                  ? "1"
                  : firstPlayerPickedLength >= 3
                    ? "1"
                    : "0.3"
              }
              x="58"
              y="398"
              width="6"
              height={firstPlayerPickedLength >= 3 ? "36" : "35"}
              fill="#18FFCB"
            />

            <rect
              opacity={
                firstPlayerPickedLength === 3 && secondPlayerPickedLength === 3
                  ? "1"
                  : firstPlayerPickedLength >= 4
                    ? "1"
                    : "0.3"
              }
              x="58"
              y="433"
              width="6"
              height={firstPlayerPickedLength >= 4 ? "54" : "53"}
              fill="#18FFCB"
            />

            <rect
              opacity={
                firstPlayerPickedLength === 4 && secondPlayerPickedLength === 3
                  ? "1"
                  : secondPlayerPickedLength >= 4
                    ? "1"
                    : "0.3"
              }
              x="58"
              y="486"
              width="6"
              height={secondPlayerPickedLength >= 4 ? "40" : "39"}
              fill="#18FFCB"
            />

            <rect
              opacity={
                firstPlayerPickedLength === 4 && secondPlayerPickedLength === 4
                  ? "1"
                  : secondPlayerPickedLength >= 5
                    ? "1"
                    : "0.3"
              }
              x="58"
              y="525"
              width="6"
              height={secondPlayerPickedLength >= 5 ? "55" : "54"}
              fill="#18FFCB"
            />

            <rect
              opacity={
                firstPlayerPickedLength === 4 && secondPlayerPickedLength === 5
                  ? "1"
                  : firstPlayerPickedLength >= 5
                    ? "1"
                    : "0.3"
              }
              x="58"
              y="579"
              width="6"
              height={firstPlayerPickedLength >= 5 ? "35" : "34"}
              fill="#18FFCB"
            />

            <rect
              opacity={
                firstPlayerPickedLength === 5 && secondPlayerPickedLength === 5
                  ? "1"
                  : firstPlayerPickedLength >= 6
                    ? "1"
                    : "0.3"
              }
              x="58"
              y="613"
              width="6"
              height={firstPlayerPickedLength >= 6 ? "57" : "56"}
              fill="#18FFCB"
            />

            <rect
              opacity={
                firstPlayerPickedLength === 6 && secondPlayerPickedLength === 5
                  ? "1"
                  : secondPlayerPickedLength >= 6
                    ? "1"
                    : "0.3"
              }
              x="58"
              y="669"
              width="6"
              height={secondPlayerPickedLength >= 6 ? "39" : "38"}
              fill="#18FFCB"
            />

            <rect
              opacity={
                firstPlayerPickedLength === 6 && secondPlayerPickedLength === 6
                  ? "1"
                  : secondPlayerPickedLength >= 7
                    ? "1"
                    : "0.3"
              }
              x="58"
              y="707"
              width="6"
              height={secondPlayerPickedLength >= 7 ? "57" : "56"}
              fill="#18FFCB"
            />

            <rect
              opacity={
                firstPlayerPickedLength === 6 && secondPlayerPickedLength === 7
                  ? "1"
                  : firstPlayerPickedLength >= 7
                    ? "1"
                    : "0.3"
              }
              x="58"
              y="763"
              width="6"
              height={firstPlayerPickedLength >= 7 ? "36" : "35"}
              fill="#18FFCB"
            />

            <rect
              opacity={
                firstPlayerPickedLength === 7 && secondPlayerPickedLength === 7
                  ? "1"
                  : firstPlayerPickedLength >= 8
                    ? "1"
                    : "0.3"
              }
              x="58"
              y="798"
              width="6"
              height={firstPlayerPickedLength >= 8 ? "57" : "56"}
              fill="#18FFCB"
            />

            <rect
              opacity={
                firstPlayerPickedLength === 8 && secondPlayerPickedLength === 7
                  ? "1"
                  : secondPlayerPickedLength >= 8
                    ? "1"
                    : "0.3"
              }
              x="58"
              y="854"
              width="6"
              height={secondPlayerPickedLength >= 8 ? "65" : "64"}
              fill="#18FFCB"
            />

            <rect opacity="1" x="58" width="6" height="31" fill="#E31D1D" />
            <rect
              opacity={
                firstPlayerBannedLength === 1 && secondPlayerBannedLength === 0
                  ? "1"
                  : secondPlayerBannedLength >= 1
                    ? "1"
                    : "0.6"
              }
              x="58"
              y="31"
              width="6.1"
              height={secondPlayerBannedLength >= 1 ? "48" : "47"}
              fill="#E31D1D"
            />
            <rect
              opacity={
                firstPlayerPickedLength === 2 && secondPlayerBannedLength === 1
                  ? "1"
                  : secondPlayerBannedLength >= 2
                    ? "1"
                    : "0.6"
              }
              x="58"
              y="271"
              width="6.1"
              height={secondPlayerBannedLength >= 2 ? "37" : "36"}
              fill="#E31D1D"
            />
            <rect
              opacity={
                firstPlayerBannedLength === 1 && secondPlayerBannedLength === 2
                  ? "1"
                  : firstPlayerBannedLength >= 2
                    ? "1"
                    : "0.6"
              }
              x="58"
              y="307"
              width="6.1"
              height={firstPlayerBannedLength >= 2 ? "44" : "43"}
              fill="#E31D1D"
            />

            {firstPlayerBannedLength === 0 ? (
              <>
                <path
                  d="M33.9141 12L0.00101852 27L33.9141 42V12Z"
                  fill="white"
                />
                <path
                  d="M52.1747 12L40.4355 17.1923V21.1304H46.9573V32.8696H40.4355V36.8077L52.1747 42V12Z"
                  fill="#E31D1D"
                />
                <rect
                  width="16.9565"
                  height="6.52174"
                  transform="matrix(-1 0 0 1 58.6963 23.7393)"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={firstPlayerBannedLength >= 1 ? "0.7" : "0.4"}>
                <path
                  d="M54.8209 16L45.4209 20.1538V23.3043H50.6431V32.6957H45.4209V35.8462L54.8209 40V16Z"
                  fill="#E31D1D"
                />
                <rect
                  width="13.5778"
                  height="5.21739"
                  transform="matrix(-1 0 0 1 60.043 25.3916)"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerBannedLength === 1 && secondPlayerBannedLength === 2 ? (
              <>
                <path
                  d="M33.9141 322L0.00101781 337L33.9141 352V322Z"
                  fill="white"
                />
                <path
                  d="M52.1747 322L40.4355 327.192V331.13H46.9573V342.87H40.4355V346.808L52.1747 352V322Z"
                  fill="#E31D1D"
                />
                <rect
                  width="16.9565"
                  height="6.52174"
                  transform="matrix(-1 0 0 1 58.6963 333.739)"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={firstPlayerBannedLength >= 2 ? "0.7" : "0.4"}>
                <path
                  d="M54.8209 320L45.4209 324.158V327.311H50.6431V336.711H45.4209V339.865L54.8209 344.022V320Z"
                  fill="#E31D1D"
                />
                <rect
                  width="13.5778"
                  height="5.22222"
                  transform="matrix(-1 0 0 1 60.043 329.4)"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerPickedLength === 0 && secondPlayerBannedLength === 1 ? (
              <>
                <path
                  d="M33.9141 104L0.00101781 119L33.9141 134V104Z"
                  fill="white"
                />
                <path
                  d="M52.1747 104L40.4355 109.192V113.13H46.9573V124.87H40.4355V128.808L52.1747 134V104Z"
                  fill="#18FFCB"
                />
                <rect
                  width="16.9565"
                  height="6.52174"
                  transform="matrix(-1 0 0 1 58.6963 115.739)"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={firstPlayerPickedLength >= 1 ? "0.7" : "0.4"}>
                <path
                  d="M54.8209 108L45.4209 112.154V115.304H50.6431V124.696H45.4209V127.846L54.8209 132V108Z"
                  fill="#18FFCB"
                />
                <rect
                  width="13.5778"
                  height="5.21739"
                  transform="matrix(-1 0 0 1 60.043 117.392)"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerBannedLength === 2 &&
            secondPlayerPickedLength === 3 &&
            firstPlayerPickedLength < 3 ? (
              <>
                <path
                  d="M33.9141 414L0.00101781 429L33.9141 444V414Z"
                  fill="white"
                />
                <path
                  d="M52.1747 414L40.4355 419.192V423.13H46.9573V434.87H40.4355V438.808L52.1747 444V414Z"
                  fill="#18FFCB"
                />
                <rect
                  width="16.9565"
                  height="6.52174"
                  transform="matrix(-1 0 0 1 58.6963 425.739)"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={firstPlayerPickedLength >= 3 ? "0.7" : "0.4"}>
                <path
                  d="M54.8209 412L45.4209 416.158V419.311H50.6431V428.711H45.4209V431.865L54.8209 436.022V412Z"
                  fill="#18FFCB"
                />
                <rect
                  width="13.5778"
                  height="5.22222"
                  transform="matrix(-1 0 0 1 60.043 421.4)"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerPickedLength === 4 && secondPlayerPickedLength === 5 ? (
              <>
                <path
                  d="M33.9141 595L0.00101781 610L33.9141 625V595Z"
                  fill="white"
                />
                <path
                  d="M52.1747 595L40.4355 600.192V604.13H46.9573V615.87H40.4355V619.808L52.1747 625V595Z"
                  fill="#18FFCB"
                />
                <rect
                  width="16.9565"
                  height="6.52174"
                  transform="matrix(-1 0 0 1 58.6963 606.739)"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={firstPlayerPickedLength >= 5 ? "0.7" : "0.4"}>
                <path
                  d="M54.8209 596L45.4209 600.158V603.311H50.6431V612.711H45.4209V615.865L54.8209 620.022V596Z"
                  fill="#18FFCB"
                />
                <rect
                  width="13.5778"
                  height="5.22222"
                  transform="matrix(-1 0 0 1 60.043 605.4)"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerPickedLength === 6 && secondPlayerPickedLength === 7 ? (
              <>
                <path
                  d="M33.9131 779L4.12464e-05 794L33.9131 809V779Z"
                  fill="white"
                />
                <path
                  d="M52.1737 779L40.4346 784.192V788.13H46.9563V799.87H40.4346V803.808L52.1737 809V779Z"
                  fill="#18FFCB"
                />
                <rect
                  width="16.9565"
                  height="6.52174"
                  transform="matrix(-1 0 0 1 58.6953 790.739)"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={firstPlayerPickedLength >= 7 ? "0.7" : "0.4"}>
                <path
                  d="M54.8209 780L45.4209 784.158V787.311H50.6431V796.711H45.4209V799.865L54.8209 804.022V780Z"
                  fill="#18FFCB"
                />
                <rect
                  width="13.5778"
                  height="5.22222"
                  transform="matrix(-1 0 0 1 60.043 789.4)"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerPickedLength === 1 && secondPlayerPickedLength === 2 ? (
              <>
                <path
                  d="M33.9141 234L0.00101781 249L33.9141 264V234Z"
                  fill="white"
                />
                <path
                  d="M52.1747 234L40.4355 239.192V243.13H46.9573V254.87H40.4355V258.808L52.1747 264V234Z"
                  fill="#18FFCB"
                />
                <rect
                  width="16.9565"
                  height="6.52174"
                  transform="matrix(-1 0 0 1 58.6963 245.739)"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={firstPlayerPickedLength >= 2 ? "0.7" : "0.4"}>
                <path
                  d="M54.8209 232L45.4209 236.158V239.311H50.6431V248.711H45.4209V251.865L54.8209 256.022V232Z"
                  fill="#18FFCB"
                />
                <rect
                  width="13.5778"
                  height="5.22222"
                  transform="matrix(-1 0 0 1 60.043 241.4)"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerPickedLength === 5 && secondPlayerPickedLength === 5 ? (
              <>
                <path
                  d="M33.9141 650L0.00101781 665L33.9141 680V650Z"
                  fill="white"
                />
                <path
                  d="M52.1747 650L40.4355 655.192V659.13H46.9573V670.87H40.4355V674.808L52.1747 680V650Z"
                  fill="#18FFCB"
                />
                <rect
                  width="16.9565"
                  height="6.52174"
                  transform="matrix(-1 0 0 1 58.6963 661.739)"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={firstPlayerPickedLength >= 6 ? "0.7" : "0.4"}>
                <path
                  d="M54.8209 655L45.4209 659.158V662.311H50.6431V671.711H45.4209V674.865L54.8209 679.022V655Z"
                  fill="#18FFCB"
                />
                <rect
                  width="13.5778"
                  height="5.22222"
                  transform="matrix(-1 0 0 1 60.043 664.4)"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerPickedLength === 7 && secondPlayerPickedLength === 7 ? (
              <>
                <path
                  d="M33.9141 836L0.00101781 851L33.9141 866V836Z"
                  fill="white"
                />
                <path
                  d="M52.1747 836L40.4355 841.192V845.13H46.9573V856.87H40.4355V860.808L52.1747 866V836Z"
                  fill="#18FFCB"
                />
                <rect
                  width="16.9565"
                  height="6.52174"
                  transform="matrix(-1 0 0 1 58.6963 847.739)"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={firstPlayerPickedLength >= 8 ? "0.7" : "0.4"}>
                <path
                  d="M54.8209 839L45.4209 843.158V846.311H50.6431V855.711H45.4209V858.865L54.8209 863.022V839Z"
                  fill="#18FFCB"
                />
                <rect
                  width="13.5778"
                  height="5.22222"
                  transform="matrix(-1 0 0 1 60.043 848.4)"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerBannedLength === 1 && secondPlayerBannedLength === 0 ? (
              <>
                <path d="M89.7822 51L123.695 66L89.7822 81V51Z" fill="white" />
                <path
                  d="M71.5216 51L83.2607 56.1923V60.1304H76.739V71.8696H83.2607V75.8077L71.5216 81V51Z"
                  fill="#E31D1D"
                />
                <rect
                  x="64.330"
                  y="62.7393"
                  width="16.9565"
                  height="6.52174"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={secondPlayerBannedLength >= 1 ? "0.7" : "0.4"}>
                <path
                  d="M68.265 55L77.665 59.1538V62.3043H72.4428V71.6957H77.665V74.8462L68.265 79V55Z"
                  fill="#E31D1D"
                />
                <rect
                  x="63.043"
                  y="64.3916"
                  width="13.5778"
                  height="5.21739"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerPickedLength === 2 && secondPlayerBannedLength === 1 ? (
              <>
                <path
                  d="M89.7832 289L123.696 304L89.7832 319V289Z"
                  fill="white"
                />
                <path
                  d="M71.5226 289L83.2617 294.192V298.13H76.74V309.87H83.2617V313.808L71.5226 319V289Z"
                  fill="#E31D1D"
                />
                <rect
                  x="64.330"
                  y="300.739"
                  width="16.9565"
                  height="6.52174"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={secondPlayerBannedLength >= 2 ? "0.7" : "0.4"}>
                <path
                  d="M68.265 287L77.665 291.158V294.311H72.4428V303.711H77.665V306.865L68.265 311.022V287Z"
                  fill="#E31D1D"
                />
                <rect
                  x="63.043"
                  y="296.4"
                  width="13.5778"
                  height="5.22222"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerPickedLength === 1 && secondPlayerPickedLength === 0 ? (
              <>
                <path
                  d="M89.7832 143L123.696 158L89.7832 173V143Z"
                  fill="white"
                />
                <path
                  d="M71.5226 143L83.2617 148.192V152.13H76.74V163.87H83.2617V167.808L71.5226 173V143Z"
                  fill="#18FFCB"
                />
                <rect
                  x="64.330"
                  y="154.739"
                  width="16.9565"
                  height="6.52174"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={firstPlayerPickedLength >= 1 ? "0.7" : "0.4"}>
                <path
                  d="M68.265 141L77.665 145.158V148.311H72.4428V157.711H77.665V160.865L68.265 165.022V141Z"
                  fill="#18FFCB"
                />
                <rect
                  x="63.043"
                  y="150.4"
                  width="13.5778"
                  height="5.22222"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerPickedLength === 1 && secondPlayerPickedLength === 1 ? (
              <>
                <path
                  d="M89.7832 198L123.696 213L89.7832 228V198Z"
                  fill="white"
                />
                <path
                  d="M71.5226 198L83.2617 203.192V207.13H76.74V218.87H83.2617V222.808L71.5226 228V198Z"
                  fill="#18FFCB"
                />
                <rect
                  x="64.330"
                  y="209.739"
                  width="16.9565"
                  height="6.52174"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={secondPlayerPickedLength >= 2 ? "0.7" : "0.4"}>
                <path
                  d="M68.265 196L77.665 200.158V203.311H72.4428V212.711H77.665V215.865L68.265 220.022V196Z"
                  fill="#18FFCB"
                />
                <rect
                  x="63.043"
                  y="205.4"
                  width="13.5778"
                  height="5.22222"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerBannedLength === 2 && secondPlayerPickedLength === 2 ? (
              <>
                <path
                  d="M89.7832 380L123.696 395L89.7832 410V380Z"
                  fill="white"
                />
                <path
                  d="M71.5226 380L83.2617 385.192V389.13H76.74V400.87H83.2617V404.808L71.5226 410V380Z"
                  fill="#18FFCB"
                />
                <rect
                  x="64.330"
                  y="391.739"
                  width="16.9565"
                  height="6.52174"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={secondPlayerPickedLength >= 3 ? "0.7" : "0.4"}>
                <path
                  d="M68.265 378L77.665 382.158V385.311H72.4428V394.711H77.665V397.865L68.265 402.022V378Z"
                  fill="#18FFCB"
                />
                <rect
                  x="63.043"
                  y="387.4"
                  width="13.5778"
                  height="5.22222"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerPickedLength === 4 && secondPlayerPickedLength === 4 ? (
              <>
                <path
                  d="M89.7832 561L123.696 576L89.7832 591V561Z"
                  fill="white"
                />
                <path
                  d="M71.5226 561L83.2617 566.192V570.13H76.74V581.87H83.2617V585.808L71.5226 591V561Z"
                  fill="#18FFCB"
                />
                <rect
                  x="64.330"
                  y="572.739"
                  width="16.9565"
                  height="6.52174"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={secondPlayerPickedLength >= 5 ? "0.7" : "0.4"}>
                <path
                  d="M68.265 562L77.665 566.158V569.311H72.4428V578.711H77.665V581.865L68.265 586.022V562Z"
                  fill="#18FFCB"
                />
                <rect
                  x="63.043"
                  y="571.4"
                  width="13.5778"
                  height="5.22222"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerPickedLength === 6 && secondPlayerPickedLength === 6 ? (
              <>
                <path
                  d="M89.7832 745L123.696 760L89.7832 775V745Z"
                  fill="white"
                />
                <path
                  d="M71.5226 745L83.2617 750.192V754.13H76.74V765.87H83.2617V769.808L71.5226 775V745Z"
                  fill="#18FFCB"
                />
                <rect
                  x="64.330"
                  y="756.739"
                  width="16.9565"
                  height="6.52174"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={secondPlayerPickedLength >= 7 ? "0.7" : "0.4"}>
                <path
                  d="M68.265 746L77.665 750.158V753.311H72.4428V762.711H77.665V765.865L68.265 770.022V746Z"
                  fill="#18FFCB"
                />
                <rect
                  x="63.043"
                  y="755.4"
                  width="13.5778"
                  height="5.22222"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerPickedLength === 4 && secondPlayerPickedLength === 3 ? (
              <>
                <path
                  d="M89.7822 506L123.695 521L89.7822 536V506Z"
                  fill="white"
                />
                <path
                  d="M71.5216 506L83.2607 511.192V515.13H76.739V526.87H83.2607V530.808L71.5216 536V506Z"
                  fill="#18FFCB"
                />
                <rect
                  x="64.330"
                  y="517.739"
                  width="16.9565"
                  height="6.52174"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={secondPlayerPickedLength >= 4 ? "0.7" : "0.4"}>
                <path
                  d="M68.265 509L77.665 513.158V516.311H72.4428V525.711H77.665V528.865L68.265 533.022V509Z"
                  fill="#18FFCB"
                />
                <rect
                  x="63.043"
                  y="518.4"
                  width="13.5778"
                  height="5.22222"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerPickedLength === 6 && secondPlayerPickedLength === 5 ? (
              <>
                <path
                  d="M89.7832 688L123.696 703L89.7832 718V688Z"
                  fill="white"
                />
                <path
                  d="M71.5226 688L83.2617 693.192V697.13H76.74V708.87H83.2617V712.808L71.5226 718V688Z"
                  fill="#18FFCB"
                />
                <rect
                  x="64.330"
                  y="699.739"
                  width="16.9565"
                  height="6.52174"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={secondPlayerPickedLength >= 6 ? "0.7" : "0.4"}>
                <path
                  d="M68.265 693L77.665 697.158V700.311H72.4428V709.711H77.665V712.865L68.265 717.022V693Z"
                  fill="#18FFCB"
                />
                <rect
                  x="63.043"
                  y="702.4"
                  width="13.5778"
                  height="5.22222"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerPickedLength === 8 && secondPlayerPickedLength === 7 ? (
              <>
                <path
                  d="M89.7832 874L123.696 889L89.7832 904V874Z"
                  fill="white"
                />
                <path
                  d="M71.5226 874L83.2617 879.192V883.13H76.74V894.87H83.2617V898.808L71.5226 904V874Z"
                  fill="#18FFCB"
                />
                <rect
                  x="65.330"
                  y="885.739"
                  width="16.9565"
                  height="6.52174"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={secondPlayerPickedLength >= 8 ? "0.7" : "0.4"}>
                <path
                  d="M68.265 877L77.665 881.158V884.311H72.4428V893.711H77.665V896.865L68.265 901.022V877Z"
                  fill="#18FFCB"
                />
                <rect
                  x="63.043"
                  y="886.4"
                  width="13.5778"
                  height="5.22222"
                  fill="white"
                />
              </g>
            )}

            {firstPlayerPickedLength === 3 && secondPlayerPickedLength === 3 ? (
              <>
                <path
                  d="M33.9141 468L0.00101781 483L33.9141 498V468Z"
                  fill="white"
                />
                <path
                  d="M52.1747 468L40.4355 473.192V477.13H46.9573V488.87H40.4355V492.808L52.1747 498V468Z"
                  fill="#18FFCB"
                />
                <rect
                  width="16.9565"
                  height="6.52174"
                  transform="matrix(-1 0 0 1 58.6963 479.739)"
                  fill="white"
                />
              </>
            ) : (
              <g opacity={firstPlayerPickedLength >= 4 ? "0.7" : "0.4"}>
                <path
                  d="M53.3619 475L42.4805 479.158V482.311H48.5257V491.711H42.4805V494.865L53.3619 499.022V475Z"
                  fill="#18FFCB"
                />
                <rect
                  width="15.7176"
                  height="5.22222"
                  transform="matrix(-1 0 0 1 59.4072 484.4)"
                  fill="white"
                />
              </g>
            )}
          </g>
          <defs>
            <clipPath id="clip0_353_3115">
              <rect width="124.232" height="908" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </SVGContainer>
      {/*<TextForVision>Элементов в массиве: {items.length}/20</TextForVision>*/}
    </LineDiv>
  );
}

const ScreenOverlay = styled.div`
  position: fixed;
  bottom: 0;
  //left: 0;
  width: 36.1%;
  height: 50px;
  background: linear-gradient(to top, black, rgba(0, 0, 0, 0));
  pointer-events: none;
  z-index: 980;
`;

const TextForVision = styled.div`
  opacity: 0;
`;

const SVGContainer = styled.div`
  display: flex;
  justify-content: center;
  //width: 7%;
  //position: absolute;
`;

const LineDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //align-self: center;
  //justify-self: center;
  //justify-content: center;

  margin-top: 45%;
`;
