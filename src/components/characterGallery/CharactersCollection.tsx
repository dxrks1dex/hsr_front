"use client";

import { DeleteAllCharacters } from "@/components/characters/DeleteAllCharacters";
import {
  AddButton,
  CharacterImage,
  CharactersContainer,
  StyledConeCardContainer,
} from "@/components/styled/userStyles";
import { CharacterData } from "@/types/interface";
import { onCharacterChoose } from "@/utils/onCharacterChoose";
import { ICON_DEFAULT_URL } from "@/utils/ICON_DEFAULT_URL";
import { ChangeCharacters } from "@/components/characterGallery/ChangeCharacters/ChangeCharacters";
import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addAllCharactersToDB } from "@/fetch/api/characters";
import { useCharactersContext } from "@/context/useCharactersContext";
import {
  useFetchAllCharacters,
  useFetchAllCharactersForAddToDB,
} from "@/fetch/fetch";
import styled from "styled-components";
import { StyledBgc } from "@/styles/userStyles";

export const CharactersCollection = () => {
  const queryClient = useQueryClient();

  const {
    data: { charactersFromDB },
    operations: { setCharactersFromDB },
  } = useCharactersContext();

  const { data, isLoading, error } = useFetchAllCharacters();

  const {
    data: charactersData,
    isLoading: isCharactersDataLoading,
    error: charactersDataError,
  } = useFetchAllCharactersForAddToDB();

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

  const onAddCharactersToDB = () => {
    console.log(charactersFromDB);

    console.log("characters to add: ", charactersData);

    if (!charactersData) {
      console.warn("No characters data available to add.");
      return;
    }

    mutate({ charactersData });
  };

  useEffect(() => {
    setCharactersFromDB(
      data?.sort((a: CharacterData, b: CharacterData) => b.rarity - a.rarity),
    );
  }, [data, setCharactersFromDB]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <>An error has occurred: {(error as Error).message}</>;

  return (
    <StyledBgc>
      <DeleteAllCharacters />
      <AddButton onClick={() => onAddCharactersToDB()}>
        Add characters
      </AddButton>
      <CharactersContainer style={{ color: "snow" }}>
        {charactersFromDB?.map((characterItem: CharacterData) => (
          <StyledConeCardContainer key={characterItem.id}>
            <CharacterImage
              characterRarity={characterItem.rarity}
              src={`${ICON_DEFAULT_URL}/${characterItem.icon}`}
              alt={`Character ${characterItem.id}`}
              className="character-icon"
            />
            <ChangeCharacters
              setCharactersFromDB={setCharactersFromDB}
              charactersFromDB={charactersFromDB}
              characterItem={characterItem}
            />
          </StyledConeCardContainer>
        ))}
      </CharactersContainer>
    </StyledBgc>
  );
};
