import { ChangeCharacterCost } from "@/components/characterGallery/ChangeCharacterCost";
import { CharacterData, LightConeData } from "@/types/interface";
import React, { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateCharactersCost } from "@/fetch/api/characters";
import { updateConeCost } from "@/fetch/api/cones";
import { AddButton, GlobalButton } from "@/components/styled/userStyles";
import styled from "styled-components";

interface Props {
  coneItem: LightConeData;
  coneFromDB: LightConeData[];
  setConeFromDB: Dispatch<SetStateAction<LightConeData[]>>;
}

export const ChangeLightCone = ({
  coneItem,
  coneFromDB,
  setConeFromDB,
}: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(updateConeCost);

  const onCostApply = () => {
    console.log(coneFromDB);

    mutate(coneFromDB, {
      onSuccess: () => {
        queryClient.refetchQueries("light-cones");
      },
      onError: () => {
        console.log("error of update cones");
      },
    });
  };

  if (isLoading) return <div>Updating...</div>;

  return (
    <div>
      <ChangeCharacterCost
        setCharactersFromDB={setConeFromDB}
        charactersFromDB={coneFromDB}
        characterItem={coneItem}
      />
      <StyledApplyCostButton onClick={() => onCostApply()}>
        Apply cost
      </StyledApplyCostButton>
    </div>
  );
};

const StyledApplyCostButton = styled(AddButton)`
  width: 60%;

  &:hover {
    width: 70%;
  }
`;
