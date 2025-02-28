import { ISynergy } from "@/types/interface";
import { DATA_SOURCE_URL } from "@/fetch/api/DATA_SOURCE_URL";

export const createSynergy = async (synergy: ISynergy) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/synergy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(synergy),
    });
    if (!response.ok) throw new Error("Ошибка при создании связки");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateSynergy = async (id: string, updatedData: ISynergy) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/synergy/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Ошибка при обновлении связки");
    console.log(updatedData);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteSynergy = async (id: string) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/synergy/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Ошибка при удалении связки");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
