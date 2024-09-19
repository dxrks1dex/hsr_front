import React from "react";
import { changeUser, deleteUser } from "@/fetch/api/users";
import { useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { StyledDeleteButton } from "@/components/styled/userStyles";

export const DeleteUser = () => {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");

  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: isMutateLoading,
    error: mutateError,
  } = useMutation(deleteUser);

  const onUserDelete = () => {
    if (uid !== null) {
      mutate(uid, {
        onSuccess: () => {
          queryClient.refetchQueries("users");
        },
        onError: (error) => {
          console.error("Error of POST-request:", error);
        },
      });
    }
  };

  if (isMutateLoading) return <>Loading...</>;

  if (mutateError)
    return <div>An error has occurred: {(mutateError as Error).message}</div>;

  return (
    <StyledDeleteButton onClick={() => onUserDelete()}>
      Delete user
    </StyledDeleteButton>
  );
};
