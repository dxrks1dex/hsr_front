import { useMutation } from "react-query";
import {
  addAllCharactersToDB,
  deleteAllCharacters,
} from "@/fetch/api/characters";
import { StyledDeleteButton } from "@/components/styled/userStyles";
import styled from "styled-components";

export const DeleteAllCharacters = () => {
  const {
    mutate,
    isLoading: isMutate,
    error: mutateError,
  } = useMutation(deleteAllCharacters);

  const onDeleteAllCharacters = () => {
    mutate();
  };

  return (
    <StyledDeleteButtonForCones onClick={() => onDeleteAllCharacters()}>
      Delete all characters
    </StyledDeleteButtonForCones>
  );
};

const StyledDeleteButtonForCones = styled(StyledDeleteButton)`
  width: 10%;

  &:hover {
    width: 10%;
  }
  margin-bottom: 0;
`;
