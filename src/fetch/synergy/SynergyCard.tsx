import { ISynergy } from "@/types/interface";
import React, { useState } from "react";
import { GlobalButton } from "@/components/styled/userStyles";
import { UpdateSynergy } from "@/fetch/synergy/UpdateSynergy";
import styled from "styled-components";

interface Props {
  refetch: () => void;
  synergy: ISynergy;
}

export const SynergyCard = ({ synergy, refetch }: Props) => {
  const [isUpdateSynergyFormOpen, setIsUpdateSynergyFormOpen] = useState(false);

  return (
    <StyledSynegyCard key={synergy._id}>
      <StyledSynergyImage src={synergy.url} alt={""} />
      <h3>{synergy.name}</h3>
      <p>Cost: {synergy.cost}</p>

      <GlobalButton onClick={() => setIsUpdateSynergyFormOpen(true)}>
        update
      </GlobalButton>

      {isUpdateSynergyFormOpen && (
        <UpdateSynergy
          refetch={refetch}
          synergy={synergy}
          setIsUpdateSynergyFormOpen={setIsUpdateSynergyFormOpen}
        />
      )}
    </StyledSynegyCard>
  );
};

const StyledSynegyCard = styled.div`
  padding: 5px;
`;

const StyledSynergyImage = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  border: 2px dashed #fff;
`;
