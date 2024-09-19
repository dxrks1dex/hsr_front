import { useMutation, useQueryClient } from "react-query";
import { deleteAllCones } from "@/fetch/api/cones";
import { StyledDeleteButton } from "@/components/styled/userStyles";
import styled from "styled-components";

export const DeleteAllCones = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(deleteAllCones, {
    onSuccess: () => {
      queryClient.refetchQueries("light-cones");
    },
    onError: () => {
      console.log("error of add cones to data base");
    },
  });

  const onAllConesDelete = () => {
    mutate();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <StyledDeleteButtonForCones onClick={onAllConesDelete}>
      Delete all cones
    </StyledDeleteButtonForCones>
  );
};

const StyledDeleteButtonForCones = styled(StyledDeleteButton)`
  width: 10%;

  &:hover {
    width: 10%;
  }
`;
