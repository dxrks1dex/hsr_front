import styled from "styled-components";

export const PlayerSection = styled.section`
  display: flex;

  justify-content: space-between;

  margin-top: 2%;
`;

export const PlayerInfoSection = styled.section<{ currentPlayer: number }>`
  //height: 150px;

  width: 100%;
`;

export const PlayerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  //justify-items: center;
  align-items: center;
  width: 100%;
  gap: 10px;

  margin-bottom: 2%;
  margin-top: 2%;
`;

export const PlayerInput = styled.input`
  width: 60px;
  background-color: rgba(71, 85, 105, 0.05); /* bg-slate-700/5 */
  color: rgba(255, 255, 255, 0.8); /* text-white/80 */
  border-radius: 0.375rem; /* rounded-md */
  padding: 0.5rem; /* px-2 */
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.15); /* border border-white/15 */
  backdrop-filter: blur(12px); /* backdrop-blur-md */
  &:focus {
    outline: none;
  }
`;

export const PlayerInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem; /* space-x-2 */
  width: 300px;
  justify-content: center;
`;

export const PlayerImage = styled.img`
  height: 100px;
  width: 100px;
`;

export const PlayerName = styled.h1<{ player: number }>`
  color: ${({ player }) => (player === 1 ? "#000000" : "#ffffff")};

  font-size: 20px;
  font-weight: 600;

  display: flex;
  gap: 10px;
  ${({ player }) =>
    player === 1
      ? "justify-content: flex-start; text-align: left;"
      : "justify-content: flex-end; text-align: right;"}
  width: 45%;

  //justify-content: center;

  margin-right: 2%;
  margin-left: 2%;
  align-items: center;
`;

export const PlayerDisplay = styled.div`
  display: flex;
  align-items: center;
`;

export const PlusSection = styled.h1`
  color: #ffffff;

  font-size: 35px;
  opacity: 60%;

  width: 10%;
  text-align: center;
`;

export const CharactersContainer = styled.section`
  display: grid;

  grid-template-columns: repeat(9, 9%);
  grid-gap: 10px;

  justify-content: center;
  align-items: center;

  margin-top: 2%;
`;

export const CharacterCard = styled.div`
  //width: 100px;
`;

export const TeamDisplay = styled.div<{ player: number }>`
  display: flex;
  flex-direction: row;
  background-color: ${({ player }) => (player === 1 ? "#31a8ff" : "#c84a32")};

  justify-content: center;
  align-items: center;

  border-radius: 10px;
  margin-bottom: 4%;
  // margin-right: ${({ player }) => player === 1 && "4%"};
  // margin-left: ${({ player }) => player === 2 && "5%"};

  height: 70px;
`;

export const CharacterImage = styled.img<{ characterRarity: number }>`
  height: 116px;
  width: 99px;
  position: relative;
  border-radius: 5px;
  cursor: pointer;
  // box-shadow: 0px 0px 5px 2px
  //   ${(props) => (props.characterRarity === 4 ? "#54458560" : "#a35b1a60")};
  // border: 1px solid
  //   #{(props) =>
  //     props.characterRarity === 4 ? "#544585" : "rgba(207,181,59, 0.25)"};
  outline: 0;
`;

export const CharacterName = styled.h2`
  color: snow;
`;

export const ConesForCharacters = styled.img`
  //position: absolute;

  width: 50px;
  height: 50px;

  object-fit: cover;

  margin-top: 3%;
  margin-left: -2%;

  //-webkit-box-shadow: 0px 0px 11px 1px rgba(77, 168, 113, 0.1);
  //-moz-box-shadow: 0px 0px 11px 1px rgba(77, 168, 113, 0.1);
  //box-shadow: 0px 0px 11px 1px rgba(77, 168, 113, 0.2);
`;

export const RankForCharacters = styled.div`
  position: absolute;
  //z-index: 999;
  transform: translate(225%, -25%);
  width: 20px;
  border-radius: 5px;
  color: white;
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;

  background-color: #3b3b3b10;
  -webkit-box-shadow: 0px 0px 11px 1px rgba(77, 168, 113, 0.1);
  -moz-box-shadow: 0px 0px 11px 1px rgba(77, 168, 113, 0.1);
  box-shadow: 0px 0px 11px 1px rgba(77, 168, 113, 0.2);
`;

export const CharacterCost = styled(RankForCharacters)`
  transform: translate(5%, -25%);

  width: auto;
`;

export const ChangeRankForCharacters = styled.input`
  position: absolute;

  margin-top: -0.4%;
  margin-left: 1%;

  width: 30px;

  border: 1px solid;
  border-radius: 5px;

  display: flex;
  justify-content: center;

  background-color: #c8bcbd;
`;

export const TimerSection = styled.section`
  text-shadow: 2px 2px 10px #2d3861;
  color: #ffffff;

  align-items: center;

  display: flex;
  justify-content: space-between;
`;

export const MainTimerTextStyle = styled.div`
  color: snow;

  font-size: 32px;
  font-weight: 500;

  text-shadow:
    1px 1px 2px #000,
    0 0 1em #2d3861;
`;

export const PenaltyTimerText = styled.div`
  text-shadow:
    1px 1px 2px #000,
    0 0 1em #2d3861;
`;

export const CharactersCard = styled.div`
  margin-right: 16px;
`;

export const ConeCardContainer = styled.div`
  display: grid;

  justify-items: center;
  align-items: center;

  grid-template-rows: repeat(3, 1fr);

  color: snow;
`;

export const StyledConeCardContainer = styled(ConeCardContainer)`
  grid-template-rows: repeat(2, 1fr);

  border: 1px solid #1c6ea420;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition-duration: 300ms;
  text-align: center;

  &:hover {
    border: 1px solid #1c6ea440;

    -webkit-box-shadow: 0px 0px 58px -3px rgba(127, 204, 255, 0.1);
    -moz-box-shadow: 0px 0px 58px -3px rgba(127, 204, 255, 0.1);
    box-shadow: 0px 0px 58px -3px rgba(127, 204, 255, 0.1);
  }
`;

export const ConesName = styled.span`
  border-radius: 5px;
  border-color: red;
`;

export const ConesContainer = styled.section`
  width: 85%;

  display: grid;

  grid-template-columns: repeat(7, 1fr);

  border: 1px solid #1c6ea440;
  border-radius: 10px;
  padding: 20px;

  -webkit-box-shadow: 0px 0px 58px -3px rgba(127, 204, 255, 0.1);
  -moz-box-shadow: 0px 0px 58px -3px rgba(127, 204, 255, 0.1);
  box-shadow: 0px 0px 58px -3px rgba(127, 204, 255, 0.1);

  grid-gap: 25px;
`;

export const ConeIcon = styled.img`
  width: 70px;
  height: 70px;

  object-fit: cover;
`;

export const ConeNameFilter = styled.input`
  height: 30px;
  width: 600px;

  border-radius: 5px;

  margin-left: 3%;

  margin-top: 2%;
  margin-bottom: 2%;
`;

export const ElementImage = styled.img`
  width: 30px;
  height: 30px;
`;

export const MainContainer = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  overflow-y: auto;

  margin-bottom: 2%;
`;

export const GlobalInput = styled.input`
  border: 1px solid #1c6ea4;
  border-radius: 5px;
  padding: 2px;
  padding-left: 10px;
  background-color: #3d3d3d;
  color: white;
  transition-duration: 300ms;

  height: 40px;
  width: 35%;

  &::placeholder {
    color: #6e6e6e;
  }
  overflow-y: auto;
`;

export const PlayerInputDataContainer = styled.div`
  display: grid;

  grid-template-rows: repeat(3, 1fr);

  margin-left: 5px;
  margin-top: 10px;

  align-items: center;
  justify-items: center;
`;

export const GlobalButton = styled.button`
  border: 1px solid #1c6ea4;
  border-radius: 10px;
  background-color: #454141;
  color: white;
  cursor: pointer;

  align-self: center;
  justify-self: center;

  height: 50px;
  width: 50%;

  &:hover {
    width: 50%;
    border: 1px solid #1c6ea4;
    border-radius: 10px;
    background-color: #2e2b2b;
    color: white;
    transition-duration: 300ms;
  }
`;

export const StyledDeleteButton = styled(GlobalButton)`
  background-color: #ff4f3b;
  color: white;
  height: 30px;

  border-radius: 5px;
  width: 100%;

  margin-bottom: 2%;

  &:hover {
    background-color: #ff351f;
    width: 100%;
  }
`;

export const ClearFilterButton = styled(GlobalButton)`
  width: 10%;

  height: 30px;

  &:hover {
    width: 10%;
  }
`;

export const AddButton = styled(GlobalButton)`
  width: 10%;

  height: 30px;

  &:hover {
    width: 10%;
  }

  margin-top: 1%;
`;

export const UsersContainerToAdd = styled.div`
  display: flex;
  flex-direction: column;

  width: 87%;
`;

export const CustomFontDiv = styled.div`
  font-family: "prodfont", sans-serif;

  height: 100%;
  width: 100%;

  background-color: rgba(0, 0, 0, 0);
`;

export const StyledBgc = styled.div`
  background-color: #c48353;
`;
