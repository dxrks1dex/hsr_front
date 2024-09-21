import styled from "styled-components";

export const PlayerSection = styled.section`
  display: flex;

  justify-content: space-between;

  margin-top: 2%;
`;

export const PlayerInfoSection = styled.section<{ currentPlayer: number }>`
  //position: absolute;
  // background-color: #2d3861;
  //
  // //height: 150px;
  //
  // width: 13%;
  //
  // top: 8%;
  // border-radius: 5px;
  //
  // ${(props) => (props.currentPlayer === 1 ? "left: 0;" : "right: 0;")}
`;

export const PlayerInfo = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;

  gap: 10px;

  margin-bottom: 2%;
  margin-top: 2%;
`;

export const PlayerImage = styled.img`
  height: 100px;
  width: 100px;

  border-radius: 5px;
`;

export const PlayerName = styled.h1`
  color: snow;

  font-size: 20px;
  font-weight: 600;
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

export const CharacterImage = styled.img<{ characterRarity: number }>`
  height: 70px;
  width: 70px;

  border-radius: 5px;

  border: 2px solid
    ${(props) => (props.characterRarity === 4 ? "#544585" : "#a35b1a")};

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
`;

export const RankForCharacters = styled.div`
  position: absolute;

  transform: translate(225%, 15%);

  //margin-top: 4.5%;
  //margin-left: 1.7%;

  width: 20px;

  border: 1px solid;
  border-radius: 5px;

  display: flex;
  justify-content: center;

  background-color: gray;
`;

export const ChangeRankForCharacters = styled.input`
  //position: absolute;

  margin-top: -0.4%;
  margin-left: 1%;

  width: 40px;

  border: 1px solid;
  border-radius: 5px;

  display: flex;
  justify-content: center;

  background-color: #c8bcbd;
`;

export const TimerSection = styled.section`
  align-items: center;

  display: grid;
  justify-items: center;

  margin-left: 5%;
  margin-right: 5%;

  text-shadow: 2px 2px 10px #2d3861;
`;

export const MainTimerTextStyle = styled.div`
  color: snow;

  font-size: 24px;
  font-weight: 600;

  text-shadow:
    1px 1px 2px #000,
    0 0 1em #2d3861;
`;

export const PenaltyTimerText = styled.div`
  color: snow;

  font-size: 18px;
  font-weight: 600;

  text-shadow:
    1px 1px 2px #000,
    0 0 1em #2d3861;
`;

export const CharactersCard = styled.div`
  width: 80px;
  height: 100px;

  display: grid;
  justify-items: center;
  align-items: center;
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

  border: 1px solid #f0986b;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition-duration: 300ms;
  text-align: center;

  &:hover {
    border: 1px solid #e3f7e0;

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

  border: 1px solid #e3f7e0;
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
  //width: 100vw;
  justify-content: center;
  align-items: center;
  //overflow-y: auto;

  margin-bottom: 2%;
`;

export const GlobalInput = styled.input<{ team: number }>`
  border: 1px solid ${(props) => (props.team === 1 ? "#bfe7d0" : "#feaa94")};
  border-radius: 5px;
  padding: 2px;
  padding-left: 10px;
  background-color: #708693;
  color: white;
  transition-duration: 300ms;

  height: 40px;
  //width: 35%;

  &::placeholder {
    color: white;
  }
  overflow-y: auto;
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

  transition:
    width 300ms,
    background-color 300ms,
    border-color 300ms;

  &:hover {
    width: 50%;
    border: 1px solid #1c6ea4;
    border-radius: 10px;
    background-color: #2e2b2b;
    color: white;
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
