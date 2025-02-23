import { useGetSynergy } from "@/fetch/fetch";
import { LoadingAnimation } from "@/components/common/LoadingAnimation";
import { ISynergy } from "@/types/interface";
import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { UpdateSynergy } from "@/fetch/synergy/UpdateSynergy";
import { GlobalButton } from "@/components/styled/userStyles";
import { SynergyCard } from "@/fetch/synergy/SynergyCard";

export const SynergyList = () => {
  const { data, isLoading, error, refetch } = useGetSynergy();

  if (isLoading) return <LoadingAnimation />;
  if (error) return <>An error has occurred: {(error as Error).message}</>;

  return (
    <SynegyContainer>
      {data?.map((synergy: ISynergy) => (
        <SynergyCard synergy={synergy} key={synergy._id} refetch={refetch} />
      ))}
    </SynegyContainer>
  );
};

const SynegyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledSynegyCard = styled.div`
  padding: 5px;
`;

const StyledSynergyImage = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  border: 2px dashed #fff;
`;
