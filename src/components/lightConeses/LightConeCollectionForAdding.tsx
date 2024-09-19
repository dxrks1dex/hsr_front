import React, { useEffect, useRef, useState } from "react";
import { ICON_DEFAULT_URL } from "@/utils/ICON_DEFAULT_URL";
import {
  ConeIcon,
  ConesName,
  ConesContainer,
  GlobalInput,
  StyledConeCardContainer,
} from "@/components/styled/userStyles";
import { useSearchParams } from "next/navigation";
import { useFetchLightClones, useFetchUserData } from "@/fetch/fetch";
import { useMutation, useQueryClient } from "react-query";
import { addAllCharactersToDB } from "@/fetch/api/characters";
import { CharacterData, LightConeData } from "@/types/interface";
import { useLightConeContext } from "@/context/useLightConeContext";
import { onConeChoose } from "@/utils/onConeChoose";
import styled from "styled-components";

export const LightConeCollectionForAdding = () => {
  const [coneName, setConeName] = useState("");

  const scrollPositionRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  //change it another time

  const {
    data: { coneForUser, coneFromDB },
    operations: { setConeForUser, setConeFromDB },
  } = useLightConeContext();

  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const userUid = searchParams.get("uid");

  const operation = searchParams.get("op");

  const {
    data: allConeData,
    isLoading: isConesLoading,
    error: ConesError,
  } = useFetchLightClones();

  const {
    mutate,
    isLoading: isMutate,
    error: mutateError,
  } = useMutation(addAllCharactersToDB, {
    onSuccess: () => {
      queryClient.refetchQueries("light-cones");
    },
    onError: (error) => {
      console.error("Error of POST-request:", error);
    },
  });

  const {
    data: userDataFromDB,
    isLoading: isLoadingFromDB,
    error: errorFromDB,
  } = useFetchUserData({ uid: userUid });

  useEffect(() => {
    if (allConeData && coneForUser) {
      const coneToAdd = allConeData.filter(
        (lightCone: LightConeData) =>
          !coneForUser.some((userCone) => userCone.id === lightCone.id),
      );

      setConeFromDB(
        allConeData.sort(
          (a: CharacterData, b: CharacterData) => b.rarity - a.rarity,
        ),
      );
    }
  }, [allConeData, coneForUser, setConeFromDB]);

  useEffect(() => {
    if (operation === "changeUser" && userDataFromDB) {
      setConeFromDB(userDataFromDB.lightCones);
      setConeForUser(userDataFromDB.lightCones);
    }
  }, [operation, setConeForUser, setConeFromDB, userDataFromDB]);

  //change it another time
  useEffect(() => {
    scrollPositionRef.current = window.scrollY;

    const handleScroll = () => {
      window.scrollTo(0, scrollPositionRef.current);
    };

    timerRef.current = window.setTimeout(handleScroll, 0);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [coneFromDB]);

  return (
    <StyledConeContainer>
      <StyledFilterInput
        value={coneName}
        onChange={(e) => setConeName(e.target.value)}
        placeholder="Filter by name"
      />
      <ConesContainer>
        {coneFromDB
          .filter((cone: LightConeData) =>
            cone?.name?.toLowerCase().includes(coneName.toLowerCase()),
          )
          .map((coneData: LightConeData) => (
            <StyledConeCardContainer
              key={coneData.id}
              onClick={() =>
                onConeChoose({
                  setConeFromDB,
                  setConeForUser,
                  coneForUser,
                  coneFromDB,
                  coneId: coneData.id,
                })
              }
            >
              <ConeIcon
                src={`${ICON_DEFAULT_URL}/icon/light_cone/${coneData.id}.png`}
              />
              <ConesName>{coneData.name}</ConesName>
            </StyledConeCardContainer>
          ))}
      </ConesContainer>
    </StyledConeContainer>
  );
};

const StyledConeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StyledFilterInput = styled(GlobalInput)`
  margin-top: 2%;
  margin-bottom: 2%;

  border-radius: 10px;

  height: 30px;
`;
