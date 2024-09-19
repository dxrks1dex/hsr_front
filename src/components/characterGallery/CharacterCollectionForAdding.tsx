import React, { useEffect, useState } from "react";
import { ICON_DEFAULT_URL } from "@/utils/ICON_DEFAULT_URL";
import {
  ChangeRankForCharacters,
  CharacterImage,
  CharactersContainer,
  ClearFilterButton,
  ElementImage,
  MainContainer,
} from "@/components/styled/userStyles";
import { useSearchParams } from "next/navigation";
import {
  useFetchAllCharacters,
  useFetchData,
  useFetchUserData,
} from "@/fetch/fetch";
import { AddNewUser } from "@/fetch/userOperations/AddNewUser";
import { useCharactersContext } from "@/context/useCharactersContext";
import { onCharacterChoose } from "@/utils/onCharacterChoose";
import { UserData } from "@/components/searchUser/changeUser/UserData";
import { useMutation, useQueryClient } from "react-query";
import {
  addAllCharactersToDB,
  deleteAllCharacters,
  updateAllCharactersField,
  updateCharactersCost,
} from "@/fetch/api/characters";
import { CharacterData } from "@/types/interface";
import { DeleteAllCharacters } from "@/components/characters/DeleteAllCharacters";
import { ChangeCharacters } from "@/components/characterGallery/ChangeCharacters/ChangeCharacters";
import { useLightConeContext } from "@/context/useLightConeContext";
import { LightConesCollection } from "@/components/lightConeses/LightConesCollection";
import { LightConeCollectionForAdding } from "@/components/lightConeses/LightConeCollectionForAdding";
import styled from "styled-components";

export const CharacterCollectionForAdding = () => {
  const [filterByElement, setFilterByElement] = useState<CharacterData[]>([]);
  const {
    data: { charactersFromDB, charactersForUser },
    operations: { setCharactersFromDB, setCharactersForUser },
  } = useCharactersContext();

  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const userUid = searchParams.get("uid");

  const operation = searchParams.get("op");

  const { data, isLoading, error } = useFetchData({
    uid: userUid,
    lang: "ru",
  });

  const {
    data: allCharactersData,
    isLoading: isCharactersLoading,
    error: charactersError,
  } = useFetchAllCharacters();

  const {
    mutate,
    isLoading: isMutate,
    error: mutateError,
  } = useMutation(addAllCharactersToDB, {
    onSuccess: () => {
      queryClient.refetchQueries("characters");
    },
    onError: (error) => {
      console.error("Error of POST-request:", error);
    },
  });

  const {
    data: dataFromDB,
    isLoading: isLoadingFromDB,
    error: errorFromDB,
  } = useFetchUserData({ uid: userUid });

  useEffect(() => {
    if (allCharactersData && charactersForUser) {
      const charactersToAdd = allCharactersData.filter(
        (character: CharacterData) =>
          !charactersForUser.some((userChar) => userChar.id === character.id),
      );

      setCharactersFromDB(
        charactersToAdd.sort(
          (a: CharacterData, b: CharacterData) => b.rarity - a.rarity,
        ),
      );
    }
  }, [allCharactersData, charactersForUser, setCharactersFromDB]);

  useEffect(() => {
    if (operation === "changeUser" && dataFromDB) {
      setCharactersForUser(dataFromDB.characters);
    }
  }, [operation, dataFromDB, setCharactersForUser]);

  useEffect(() => {
    setFilterByElement(charactersFromDB);
  }, [charactersFromDB]);

  if (isLoading) return <div>Loading...</div>;

  if (isLoadingFromDB) return <div>Loading...</div>;

  if (error) return <>An error has occurred: {(error as Error).message}</>;

  const onFilterByElement = (element: string) => {
    setFilterByElement(
      charactersFromDB.filter(
        (characterElement) => characterElement.element === element,
      ),
    );
  };

  const onClearFilter = () => {
    setFilterByElement(charactersFromDB);
  };

  return (
    <div>
      <MainContainer>
        {charactersFromDB
          .filter(
            (charItem, index, self) =>
              index === self.findIndex((t) => t.element === charItem.element),
          )
          .sort((a, b) => a.element.localeCompare(b.element))
          .map((charItem) =>
            charItem.element === "Thunder" ? (
              <ElementImage
                key={charItem.id}
                src={`${ICON_DEFAULT_URL}/icon/element/Lightning.png`}
                alt={""}
                onClick={() => onFilterByElement(charItem.element)}
              />
            ) : (
              <ElementImage
                key={charItem.id}
                src={`${ICON_DEFAULT_URL}/icon/element/${charItem.element}.png`}
                alt={""}
                onClick={() => onFilterByElement(charItem.element)}
              />
            ),
          )}
        <ClearFilterButton onClick={() => onClearFilter()}>
          Clear filter element
        </ClearFilterButton>
      </MainContainer>
      <CharactersContainer>
        {filterByElement.map((characterItem: CharacterData) => (
          <div key={characterItem.id}>
            <CharacterImage
              characterRarity={characterItem.rarity}
              onClick={() =>
                onCharacterChoose({
                  charactersFromDB,
                  charactersForUser,
                  setCharactersFromDB,
                  setCharactersForUser,
                  characterId: characterItem.id,
                })
              }
              src={`${ICON_DEFAULT_URL}/${characterItem.icon}`}
              alt={`Character ${characterItem.id}`}
              className="character-icon"
            />
          </div>
        ))}
      </CharactersContainer>
      {/*<LightConeCollectionForAdding />*/}
      <MainContainer>
        {operation === "addNewUser" ? (
          <AddNewUser
            charactersForUser={charactersForUser}
            setCharactersForUser={setCharactersForUser}
            setCharactersFromDB={setCharactersFromDB}
            data={data}
            userUid={userUid}
          />
        ) : (
          <UserData
            setCharactersFromDB={setCharactersFromDB}
            setCharactersForUser={setCharactersForUser}
            charactersForUser={charactersForUser}
          />
        )}
        <div />
      </MainContainer>
    </div>
  );
};

const StyledClearElementButton = styled.button`
  height: 30px;
`;
