import {
  useFetchLightClones,
  useFetchLightClonesForAddToDB,
  useFetchUserData,
} from "@/fetch/fetch";
import styled from "styled-components";
import { LightConeData } from "@/types/interface";
import { ICON_DEFAULT_URL } from "@/utils/ICON_DEFAULT_URL";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addAllCones } from "@/fetch/api/cones";
import { DeleteAllCones } from "@/components/lightConeses/DeleteAllCones";
import { useLightConeContext } from "@/context/useLightConeContext";
import { ChangeLightCone } from "@/components/lightConeses/changeCone/ChangeCone";
import { onConeChoose } from "@/utils/onConeChoose";
import {
  ConeCardContainer,
  ConeIcon,
  ConesName,
  ConesContainer,
  ConeNameFilter,
  StyledConeCardContainer,
  GlobalButton,
  AddButton,
} from "@/components/styled/userStyles";
import { StyledBgc } from "@/styles/userStyles";

export const LightConesCollection = () => {
  const [coneName, setConeName] = useState("");
  const { data, isLoading, error } = useFetchLightClones();

  const {
    data: { coneFromDB, coneForUser },
    operations: { setConeFromDB, setConeForUser },
  } = useLightConeContext();

  const queryClient = useQueryClient();

  const {
    data: dataToAdd,
    isLoading: isLoadingDataToAdd,
    error: errorDataToAdd,
  } = useFetchLightClonesForAddToDB();

  const {
    mutate,
    isLoading: isConeLoading,
    error: coneAddError,
  } = useMutation(addAllCones);

  useEffect(() => {
    setConeFromDB(data);
  }, [data, setConeFromDB]);

  const onAddAllConesToDB = () => {
    mutate(dataToAdd, {
      onSuccess: () => {
        queryClient.refetchQueries("light-cones");
      },
      onError: () => {
        console.log("error of add cones to data base");
      },
    });
  };

  if (isLoading || isLoadingDataToAdd) return <div>Loading</div>;

  if (error) return <>An error has occurred: {(error as Error).message}</>;

  return (
    <StyledBgc>
      <DeleteAllCones />
      <AddButton onClick={() => onAddAllConesToDB()}>Add all cones</AddButton>
      <ConeNameFilter
        value={coneName}
        onChange={(e) => setConeName(e.target.value)}
        placeholder="Filter by name"
      />
      <ConesContainer>
        {coneFromDB &&
          coneFromDB
            .filter(
              (cone: LightConeData) =>
                cone?.name?.toLowerCase().includes(coneName.toLowerCase()) ||
                cone?.secondName
                  ?.toLowerCase()
                  .includes(coneName.toLowerCase()),
            )
            .map((coneData: LightConeData) => (
              <StyledConeCardContainer key={coneData.id}>
                <ConeIcon
                  onClick={() =>
                    onConeChoose({
                      setConeFromDB,
                      setConeForUser,
                      coneForUser,
                      coneFromDB,
                      coneId: coneData.id,
                    })
                  }
                  src={`${ICON_DEFAULT_URL}/icon/light_cone/${coneData.id}.png`}
                />
                <ConesName>{coneData.name}</ConesName>
                <ConesName>cost: {coneData.cost}</ConesName>
                <ChangeLightCone
                  coneFromDB={coneFromDB}
                  setConeFromDB={setConeFromDB}
                  coneItem={coneData}
                />
              </StyledConeCardContainer>
            ))}
      </ConesContainer>
    </StyledBgc>
  );
};
