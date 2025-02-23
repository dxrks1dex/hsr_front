"use client";
import styled from "styled-components";
import { useGetSynergy } from "@/fetch/fetch";
import { LoadingAnimation } from "@/components/common/LoadingAnimation";
import { SynergyForm } from "@/fetch/synergy/AddSynergyForm";
import { SynergyList } from "@/fetch/synergy/SynergyList";
import { useRef, useState } from "react";
import { GlobalButton } from "@/components/styled/userStyles";
import { useOutsideDetect } from "@/utils/useOutsideDetect";

export const SynergyMain = () => {
  const [isAddNewSynergy, setIsAddNewSynergy] = useState(false);

  const showNewSynergyForm = () => {
    setIsAddNewSynergy(true);
  };

  return (
    <StyledSynergyPageColour>
      <SynergyList />
      <StyledAddNewSynergyButton onClick={() => showNewSynergyForm()}>
        Add new synergy
      </StyledAddNewSynergyButton>
      {isAddNewSynergy && (
        <SynergyForm setIsAddNewSynergy={setIsAddNewSynergy} />
      )}
    </StyledSynergyPageColour>
  );
};

const StyledSynergyPageColour = styled.div`
  background-color: #c48353;
  min-height: 100vh;
`;

const StyledAddNewSynergyButton = styled(GlobalButton)`
  width: 200px;

  &:hover {
    width: 200px;
  }
`;
