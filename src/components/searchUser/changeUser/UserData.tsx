import React, { Dispatch, SetStateAction, useState } from "react";
import { changeUser } from "@/fetch/api/users";
import { useSearchParams } from "next/navigation";
import { useFetchUserData } from "@/fetch/fetch";
import {
  AddButton,
  CharacterImage,
  CharactersContainer,
  ConesForCharacters,
  UsersContainerToAdd,
} from "@/components/styled/userStyles";
import { ICON_DEFAULT_URL } from "@/utils/ICON_DEFAULT_URL";
import { ChangeUserName } from "@/components/searchUser/changeUser/ChangeUserName";
import { ChangeCharacterOrConeRankForNewUser } from "@/components/characterGallery/ChangeCharacterOrConeRankForNewUser";
import { useMutation, useQueryClient } from "react-query";
import { onCharacterDelete } from "@/utils/onCharacterDelete";
import { CharacterData } from "@/types/interface";
import { useLightConeContext } from "@/context/useLightConeContext";
import styled from "styled-components";

interface Props {
  charactersForUser: CharacterData[];

  setCharactersFromDB: Dispatch<SetStateAction<CharacterData[]>>;
  setCharactersForUser: Dispatch<SetStateAction<CharacterData[]>>;
}

export const UserData = ({
  setCharactersFromDB,
  setCharactersForUser,
  charactersForUser,
}: Props) => {
  const [newNickname, setNewNickname] = useState("");

  const {
    data: { coneForUser },
    operations: { setConeForUser, setConeFromDB },
  } = useLightConeContext();

  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useFetchUserData({ uid });

  const {
    mutate,
    isLoading: isMutate,
    error: mutateError,
  } = useMutation(changeUser);

  const onCharactersAddToDB = () => {
    if (uid === null) {
      return;
    }

    console.log(charactersForUser);
    console.log(coneForUser);

    mutate(
      {
        uid: uid,
        user: {
          ...data,
          nickname: newNickname === "" ? data.nickname : newNickname,
          characters: charactersForUser,
          lightCones: coneForUser,
        },
      },
      {
        onSuccess: () => {
          queryClient.refetchQueries("user");
          queryClient.refetchQueries("user");
          queryClient.refetchQueries("users");
          setNewNickname("");
        },
        onError: (error) => {
          console.error("Error of POST-request:", error);
        },
      },
    );
  };

  const onConeDelete = (coneId: string) => {
    onCharacterDelete({
      characterId: coneId,
      setCharactersForUser: setConeForUser,
      setCharactersFromDB: setConeFromDB,
      charactersForUser: coneForUser,
    });
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>User not fount</div>;

  return (
    <UsersContainerToAdd>
      <ChangeUserName
        userData={data}
        newNickname={newNickname}
        setNewNickname={setNewNickname}
      />
      <CharactersContainer>
        {charactersForUser.map((character) => (
          <div key={character.id}>
            <CharacterImage
              characterRarity={character.rarity}
              src={`${ICON_DEFAULT_URL}/${character?.icon}`}
              onClick={() =>
                onCharacterDelete({
                  characterId: character.id,
                  setCharactersFromDB,
                  setCharactersForUser,
                  charactersForUser,
                })
              }
            />
            {character?.lightCone?.id &&
              (character?.lightCone?.name === "Along the Passing Shore" ? (
                <ConesForCharacters
                  src={`${ICON_DEFAULT_URL}/icon/light_cone/23024.png`}
                />
              ) : (
                <ConesForCharacters
                  src={`${ICON_DEFAULT_URL}/icon/light_cone/${character?.lightCone?.id}.png`}
                />
              ))}
            <ChangeCharacterOrConeRankForNewUser
              setCharactersForUser={setCharactersForUser}
              newRank={character.rank}
              characterId={character.id}
            />
          </div>
        ))}
      </CharactersContainer>
      <CharactersContainer>
        {coneForUser.map((cone) => (
          <div key={cone.id}>
            <CharacterImage
              onClick={() => onConeDelete(cone.id)}
              characterRarity={cone.rarity}
              src={`${ICON_DEFAULT_URL}/icon/light_cone/${cone?.id}.png`}
            />
            <ChangeCharacterOrConeRankForNewUser
              setCharactersForUser={setConeForUser}
              characterId={cone.id}
              newRank={cone.rank}
            />
          </div>
        ))}
      </CharactersContainer>
      <StyledAddButton onClick={onCharactersAddToDB} disabled={isMutate}>
        Add characters for user
      </StyledAddButton>
    </UsersContainerToAdd>
  );
};

const StyledAddButton = styled(AddButton)`
  width: 10%;
  height: 5%;
`;
