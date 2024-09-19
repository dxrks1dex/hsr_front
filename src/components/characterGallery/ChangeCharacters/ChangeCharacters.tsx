import { ChangeCharacterCost } from "@/components/characterGallery/ChangeCharacterCost";
import { CharacterData } from "@/types/interface";
import React, { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateCharactersCost } from "@/fetch/api/characters";
import styled from "styled-components";
import { AddButton } from "@/components/styled/userStyles";

interface Props {
  characterItem: CharacterData;
  charactersFromDB: CharacterData[];
  setCharactersFromDB: Dispatch<SetStateAction<CharacterData[]>>;
}

export const ChangeCharacters = ({
  charactersFromDB,
  setCharactersFromDB,
  characterItem,
}: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(updateCharactersCost);

  const onCostApply = () => {
    console.log(charactersFromDB);

    mutate(charactersFromDB, {
      onSuccess: () => {
        queryClient.refetchQueries("characters");
      },
      onError: () => {
        console.log("error of update characters");
      },
    });
  };

  return (
    <div>
      <ChangeCharacterCost
        setCharactersFromDB={setCharactersFromDB}
        charactersFromDB={charactersFromDB}
        characterItem={characterItem}
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
