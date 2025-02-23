import { useQuery } from "react-query";
import { DATA_SOURCE_URL } from "@/fetch/api/DATA_SOURCE_URL";

interface IFetchData {
  uid: string | null;
  lang: string;
}

const fetchData = async ({ uid, lang }: IFetchData) => {
  const response = await fetch(`/mihomo-api/${uid}?lang=${lang}`);
  return await response.json();
};

export const useFetchData = ({ uid, lang }: IFetchData) => {
  return useQuery(["user", uid, lang], () =>
    fetchData({
      uid,
      lang,
    }),
  );
};

const fetchUserData = async ({ uid }: { uid: string | null }) => {
  const response = await fetch(`${DATA_SOURCE_URL}/users/${uid}`, {
    method: "GET",
  });
  return await response.json();
};

export const useFetchUserData = ({ uid }: { uid: string | null }) => {
  return useQuery(["user", uid], () =>
    fetchUserData({
      uid,
    }),
  );
};

const fetchAllCharacters = async () => {
  const response = await fetch(`${DATA_SOURCE_URL}/characters`, {
    method: "GET",
  });
  return await response.json();
};

export const useFetchAllCharacters = () => {
  return useQuery(["all-characters"], () => fetchAllCharacters());
};

const fetchAllCharactersForAddToDB = async () => {
  const response = await fetch(`get-allCharacters`, {
    method: "GET",
  });
  return await response.json();
};

export const useFetchAllCharactersForAddToDB = () => {
  return useQuery(["characters-forAdd"], () => fetchAllCharactersForAddToDB());
};

const fetchLightClonesForAddToDB = async () => {
  const response = await fetch("/get-clones", {
    method: "GET",
  });
  return await response.json();
};

export const useFetchLightClonesForAddToDB = () => {
  return useQuery(["light-clones-forAdd"], () => fetchLightClonesForAddToDB());
};

const fetchLightClones = async () => {
  const response = await fetch(`${DATA_SOURCE_URL}/lightcones`, {
    method: "GET",
  });
  return await response.json();
};

export const useFetchLightClones = () => {
  return useQuery(["light-cones"], () => fetchLightClones());
};

const fetchPickAndBans = async () => {
  const response = await fetch(`${DATA_SOURCE_URL}/pickAndBan`, {
    method: "GET",
  });
  return await response.json();
};

export const useFetchPickAndBans = () => {
  return useQuery(["pickAndBans"], () => fetchPickAndBans());
};

const fetchForProd = async () => {
  const response = await fetch(`${DATA_SOURCE_URL}/forProd`, {
    method: "GET",
  });
  return await response.json();
};

export const useFetchForProd = () => {
  return useQuery(["forProd"], () => fetchForProd());
};

const fetchTimer = async () => {
  const response = await fetch(`${DATA_SOURCE_URL}/timer`, {
    method: "GET",
  });
  return await response.json();
};

export const useFetchTimer = () => {
  return useQuery(["timer"], () => fetchTimer());
};

const getAllPickAndBans = async () => {
  const response = await fetch(`${DATA_SOURCE_URL}/game/pickAndBan/`, {
    method: "GET",
  });
  return await response.json();
};

export const useGetAllPickAndBans = () => {
  return useQuery(["game/pickAndBan"], () => getAllPickAndBans());
};

const getAllPickAndBansById = async (gameId: string | null) => {
  const response = await fetch(`${DATA_SOURCE_URL}/game/pickAndBan/${gameId}`, {
    method: "GET",
  });
  return await response.json();
};

export const useGetAllPickAndBansById = (gameId: string | null) => {
  return useQuery([`game/pickAndBan/${gameId}`, gameId], () =>
    getAllPickAndBansById(gameId),
  );
};

const getSynergy = async () => {
  const response = await fetch(`${DATA_SOURCE_URL}/synergy/`, {
    method: "GET",
  });
  return await response.json();
};

export const useGetSynergy = () => {
  return useQuery([`synergy`], () => getSynergy());
};

const getSynergyById = async (synId: string | null) => {
  const response = await fetch(`${DATA_SOURCE_URL}/synergy/${synId}`, {
    method: "GET",
  });
  return await response.json();
};

export const useGetSynergyById = (synId: string | null) => {
  return useQuery([`synergy/${synId}`, synId], () => getSynergyById(synId));
};
