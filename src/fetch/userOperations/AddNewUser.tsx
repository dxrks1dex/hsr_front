import { useMutation, useQueryClient } from "react-query";
import { createNewUser, IUserData } from "@/fetch/api/users";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useUserDataContext } from "@/context/userDataContext";
import { useFetchData, useFetchUserData } from "@/fetch/fetch";
import { useSearchParams } from "next/navigation";
import {
  AddButton,
  CharacterImage,
  CharactersContainer,
  ClearFilterButton,
  ConesForCharacters,
  GlobalButton,
  UsersContainerToAdd,
} from "@/components/styled/userStyles";
import { ICON_DEFAULT_URL } from "@/utils/ICON_DEFAULT_URL";
import { CharacterData, LightConeData, User } from "@/types/interface";
import { onCharacterDelete } from "@/utils/onCharacterDelete";
import { ChangeCharacterLightCones } from "@/components/lightConeses/ChangeCharacterLightConeses";
import { useLightConeContext } from "@/context/useLightConeContext";
import styled from "styled-components";
import { ChangeCharacterOrConeRankAndLevelForNewUser } from "@/components/characterGallery/ChangeCharacterOrConeRankForNewUser";

interface ICharacterData {
  [key: string]: {
    icon: string;
    Rarity?: number;
  };
}

interface Props {
  charactersForUser: CharacterData[];

  userUid: string | null;
  data: User;

  setCharactersForUser: Dispatch<SetStateAction<CharacterData[]>>;
  setCharactersFromDB: Dispatch<SetStateAction<CharacterData[]>>;
}

export const AddNewUser = ({
  data,
  charactersForUser,
  userUid,
  setCharactersForUser,
  setCharactersFromDB,
}: Props) => {
  const [isUserExistInDB, setIsUserExistInDB] = useState(false);
  const [newUserData, setNewUserData] = useState<IUserData>({
    uid: "",
    nickname: "",
    avatar: {
      id: "",
      name: "",
      icon: "",
    },
    characters: [],
    lightCones: [],
  });

  const {
    data: { coneForUser },
    operations: { setConeForUser, setConeFromDB },
  } = useLightConeContext();

  const searchParams = useSearchParams();
  const userName = searchParams.get("nickname");

  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: isMutateLoading,
    error: mutateError,
  } = useMutation(createNewUser);

  useEffect(() => {
    if (userUid === null || userName === null) {
      console.log("uid or username is not exist");
      return;
    }

    setNewUserData({
      uid: userUid,
      nickname: userName,
      avatar: data?.player?.avatar,
      characters: charactersForUser,
      lightCones: coneForUser,
    });
  }, [charactersForUser, coneForUser, data, userName, userUid]);

  const addCharacterToBd = () => {
    mutate(newUserData, {
      onSuccess: () => {
        queryClient.refetchQueries("user");
        queryClient.refetchQueries("user");
        queryClient.refetchQueries("users");
      },
      onError: () => {
        setIsUserExistInDB(true);
        console.error("Error of POST-request:", mutateError);
      },
    });
  };

  if (isMutateLoading) return <div>Loading...</div>;

  if (mutateError)
    return (
      <div style={{ color: "snow" }}>Oops something went wrong. Try to f5</div>
    );

  return (
    <UsersContainerToAdd>
      <div>
        <div style={{ color: "snow" }}>
          {isUserExistInDB ? "User already in data base" : null}
        </div>
        <CharactersContainer>
          {charactersForUser.map((character) => (
            <StyledCharacterContainer key={character.id}>
              <CharacterImage
                characterRarity={character.rarity}
                onClick={() =>
                  onCharacterDelete({
                    charactersForUser,
                    setCharactersForUser,
                    setCharactersFromDB,
                    characterId: character.id,
                  })
                }
                src={`${ICON_DEFAULT_URL}/${character.icon}`}
                alt={`Character ${character.id}`}
                className="character-icon"
              />
              <ChangeCharacterOrConeRankAndLevelForNewUser
                newLevel={character.level}
                characterId={character.id}
                newRank={character.rank}
                setCharactersForUser={setCharactersForUser}
              />
            </StyledCharacterContainer>
          ))}
        </CharactersContainer>
        {/*<CharactersContainer>*/}
        {/*  {coneForUser.map((cone, index) => (*/}
        {/*    <div key={cone.id}>*/}
        {/*      <CharacterImage*/}
        {/*        onClick={() =>*/}
        {/*          onCharacterDelete({*/}
        {/*            characterId: cone.id,*/}
        {/*            setCharactersForUser: setConeForUser,*/}
        {/*            setCharactersFromDB: setConeFromDB,*/}
        {/*            charactersForUser: coneForUser,*/}
        {/*          })*/}
        {/*        }*/}
        {/*        characterRarity={cone.rarity}*/}
        {/*        src={`${ICON_DEFAULT_URL}/icon/light_cone/${cone?.id}.png`}*/}
        {/*      />*/}
        {/*      <ChangeCharacterOrConeRankForNewUser*/}
        {/*        setCharactersForUser={setConeForUser}*/}
        {/*        characterId={cone.id}*/}
        {/*        newRank={cone.rank}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</CharactersContainer>*/}
      </div>
      <AddButton onClick={() => addCharacterToBd()} disabled={isMutateLoading}>
        ADD USER
      </AddButton>
    </UsersContainerToAdd>
  );
};

const StyledCharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
