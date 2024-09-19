import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { changeUser, IUserData } from "@/fetch/api/users";
import { CharacterData } from "@/types/interface";

interface Props {
  uid: string | null;
  characterToUpdateId: string;
  userCharacters: CharacterData[];
  userData: IUserData;

  setUserCharacters: Dispatch<SetStateAction<CharacterData[]>>;
}

export const ChangeUserCharacters = ({
  uid,
  characterToUpdateId,
  userCharacters,
  setUserCharacters,
  userData,
}: Props) => {
  const [newRank, setNewRank] = useState(0);

  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: isMutate,
    error: mutateError,
  } = useMutation(changeUser);

  const onChangeRank = (e: ChangeEvent<HTMLInputElement>) => {
    setNewRank(Number(e.target.value));
  };

  const onCharactersChange = () => {
    if (uid === null) {
      return;
    }
    const updatedCharacters = userCharacters.map((character) => {
      if (character.id === characterToUpdateId) {
        return { ...character, rank: Number(newRank) };
      }
      return character;
    });

    setUserCharacters(updatedCharacters);

    console.log(userCharacters);
    mutate(
      {
        uid: uid,
        user: { ...userData, characters: userCharacters },
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries("users");
        },
        onError: (error) => {
          console.error("Error of POST-request:", error);
        },
      },
    );
  };

  if (isMutate) return <div>Loading...</div>;

  if (mutateError)
    return <>An error has occurred: {(mutateError as Error).message}</>;

  return (
    <div>
      <input
        type="number"
        value={newRank}
        onChange={(e) => onChangeRank(e)}
        min={0}
        max={6}
      />
      <button onClick={() => onCharactersChange()} disabled={isMutate}>
        {isMutate ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};
