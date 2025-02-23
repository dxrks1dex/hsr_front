import React, { useEffect, useRef, useState } from "react";
import { useGetSynergy } from "@/fetch/fetch";
import { LoadingAnimation } from "@/components/common/LoadingAnimation";
import { ISynergy } from "@/types/interface";
import styled from "styled-components";
import { useOutsideDetect } from "@/utils/useOutsideDetect";

interface Props {
  currentPlayer: number;
  playersSynergy: ISynergy[];
  setPlayerSynergys: React.Dispatch<React.SetStateAction<(ISynergy | null)[]>>;
  updateDataForPlayers: () => Promise<void>;
}
export const SynergyToAdd = ({
  setPlayerSynergys,
  updateDataForPlayers,
  currentPlayer,
  playersSynergy,
}: Props) => {
  const [isSynergyOpen, setIsSynergyOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const wrapperRef = useRef(null);

  useOutsideDetect({ ref: wrapperRef, setIsOpen: setIsSynergyOpen });

  const { data, isLoading, error } = useGetSynergy();

  const handleSynergyClick = (index: number) => {
    setSelectedIndex(index);
    setIsSynergyOpen(true);
  };

  const onSynergySelected = (synergyData: ISynergy) => {
    if (selectedIndex === null) return;

    setPlayerSynergys((prevSynergies) => {
      const updatedSynergies = [...prevSynergies];
      updatedSynergies[selectedIndex] = synergyData;
      console.log("Обновлённые synergy:", updatedSynergies);
      return updatedSynergies;
    });

    setIsSynergyOpen(false);
    updateDataForPlayers();
    setSelectedIndex(null);
  };

  useEffect(() => {
    updateDataForPlayers();
  }, [playersSynergy, updateDataForPlayers]);

  const onSynergyDelete = (index: number) => {
    const updatedSynergies: (null | ISynergy)[] = [...playersSynergy];
    updatedSynergies[index] = null;

    setPlayerSynergys(updatedSynergies);
    updateDataForPlayers();
  };

  if (isLoading) return <LoadingAnimation />;
  if (error) return <>An error has occurred: {(error as Error).message}</>;

  return (
    <div>
      <SynergyGrid>
        {Array(6)
          .fill(null)
          .map((_, index) => {
            const synergy = playersSynergy[index] || null;
            return (
              <div key={index}>
                {synergy ? (
                  <div>
                    <StyledSynergy
                      src={synergy.url}
                      onClick={() => handleSynergyClick(index)}
                    />
                    <StyledSynergyCost>{synergy.cost}</StyledSynergyCost>
                  </div>
                ) : (
                  <StyledSynergyPlus onClick={() => handleSynergyClick(index)}>
                    +
                  </StyledSynergyPlus>
                )}
              </div>
            );
          })}
      </SynergyGrid>

      {isSynergyOpen && (
        <StyledChangeConeContainer
          ref={wrapperRef}
          currentPlayer={currentPlayer}
        >
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by name"
          />
          {data
            .filter((synergy: ISynergy) =>
              synergy.name.toLowerCase().includes(filter.toLowerCase()),
            )
            .map((synergyData: ISynergy) => (
              <StyledSynergyContainerAdd key={synergyData._id}>
                <div className="flex items-center">
                  {" "}
                  <StyledSynergyImageInAdd src={synergyData.url} />
                  <StyledSynergyName
                    onClick={() => onSynergySelected(synergyData)}
                  >
                    {synergyData.name}
                  </StyledSynergyName>
                </div>

                {selectedIndex !== null && (
                  <StyledSynergyDeleteButton
                    onClick={() => onSynergyDelete(selectedIndex)}
                  >
                    Delete
                  </StyledSynergyDeleteButton>
                )}
              </StyledSynergyContainerAdd>
            ))}
        </StyledChangeConeContainer>
      )}
    </div>
  );
};

const SynergyGrid = styled.div`
  display: flex;

  flex-direction: column;
  gap: 10px;
`;

const StyledSynergy = styled.img`
  height: 68px;
  width: 68px;
  border-radius: 50%;
  border: 2px dashed #fff;
  object-fit: cover;

  cursor: pointer;
`;

const StyledSynergyPlus = styled.button`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #444;
  color: white;
  font-size: 24px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background-color: #666;
  }
`;

const StyledChangeConeContainer = styled.div<{ currentPlayer: number }>`
  position: absolute;
  top: 100px;
  left: ${({ currentPlayer }) => (currentPlayer === 1 ? "100px" : "1100px")};
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  z-index: 999;

  max-height: 600px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4b5563;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #334155;
  }
`;

const StyledSynergyName = styled.button`
  display: block;
  width: 100%;
  padding: 5px;
  margin: 5px 0;
  background: #ddd;
  border: none;
  cursor: pointer;
  &:hover {
    background: #bbb;
  }

  border-radius: 5px;
`;

const StyledSynergyDeleteButton = styled.button`
  background-color: #c84a32;
  color: white;
  padding: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #ff4f3b;
  }
`;

const StyledSynergyCost = styled.div`
  position: absolute;
  z-index: 10;

  transform: translate(50%, -180%);

  font-size: 20px;
  font-weight: 600;

  height: 26px;
  width: 34px;
  border-radius: 0.375rem;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  background-color: #000000;
  color: #fff;

  padding-left: 2px;
  padding-right: 2px;
`;

const StyledSynergyImageInAdd = styled.img`
  height: 2rem;
  border-radius: 5px;
`;

const StyledSynergyContainerAdd = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;

  margin-bottom: 5px;
`;
