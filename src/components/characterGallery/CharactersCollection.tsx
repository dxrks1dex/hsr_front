"use client";

import { DeleteAllCharacters } from "@/components/characters/DeleteAllCharacters";
import {
  AddButton,
  ImportInput,
  ImportButton,
  CharacterImage,
  CharactersContainer,
  StyledConeCardContainer,
} from "@/components/styled/userStyles";
import { CharacterData } from "@/types/interface";
import { onCharacterChoose } from "@/utils/onCharacterChoose";
import { ICON_DEFAULT_URL } from "@/utils/ICON_DEFAULT_URL";
import { ChangeCharacters } from "@/components/characterGallery/ChangeCharacters/ChangeCharacters";
import React, { useEffect, useState } from "react";
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

  const [importData, setImportData] = useState("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === "string") setImportData(text);
      };
      reader.readAsText(file);
    }
  };

  const onCharacterPointsImport = async () => {
    const importCharactersMap = new Map();

    for (const line of importData.split("\n")) {
      const arr = line.split("\t");
      if (arr[0] !== "" && arr.length >= 9) {
        const ids = arr[0].split(" ");
        const points = arr
          .slice(2)
          .slice(0, 7)
          .map((str) => str.replace(",", "."))
          .map((n) => Number(n) || 0);
        ids.forEach((id) => {
          importCharactersMap.set(id, points);
        });
      }
    }

    const updatedCharacters = charactersFromDB.map((character) => {
      const points = importCharactersMap.get(character.id);
      if (points) {
        return { ...character, cost: points[0], rankCost: points.slice(1) };
      } else {
        return character;
      }
    });

    setCharactersFromDB(updatedCharacters);
  };

  useEffect(() => {
    setCharactersFromDB(
      data?.sort((a: CharacterData, b: CharacterData) => b.rarity - a.rarity)
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
      <ImportInput
        team={1}
        placeholder={""}
        onChange={(e) => onFileChange(e)}
        type="file"
      />
      <ImportButton onClick={() => onCharacterPointsImport()}>
        Import Points
      </ImportButton>
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
