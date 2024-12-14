import { DATA_SOURCE_URL } from "@/fetch/api/DATA_SOURCE_URL";
import { IUserData } from "@/fetch/api/users";
import { CharacterData } from "@/types/interface";
import { CharacterInfo } from "@/fetch/api/data/characterIdData";
import { freeCharacter } from "@/common/freeCharacter";

export const getCharacter = async (id: string | null) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/characters/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get character");
    }

    const character = await response.json();
    console.log("Got character:", character);

    return character;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const createNewCharacters = async (charactersData: CharacterData) => {
  try {
    const userExistsResponse = await fetch(
      `${DATA_SOURCE_URL}/characters/${charactersData.id}`,
    );
    if (userExistsResponse.ok) {
      throw new Error("Character with this id already exists");
    }

    const response = await fetch(`${DATA_SOURCE_URL}/characters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(charactersData),
    });

    if (!response.ok) {
      throw new Error("Failed to create new character");
    }

    const newCharacters = await response.json();
    console.log("New characters created:", newCharacters);

    return newCharacters;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const changeCharacter = async ({
  id,
  character,
}: {
  id: string;
  character: CharacterData;
}) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/character/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(character),
    });

    if (!response.ok) {
      throw new Error("Failed to update character");
    }

    const updatedCharacter = await response.json();
    console.log("Changed character:", updatedCharacter);

    return updatedCharacter;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateCharactersCost = async (
  updatedCharacters: CharacterData[],
) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/characters`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCharacters),
    });

    if (!response.ok) {
      throw new Error("Failed to update cost for characters");
    }

    const data = await response.json();
    console.log(data.message);
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateAllCharactersField = async (
  updatedFields: CharacterData,
) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/characters `, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update fields for all characters. Server returned status ${response.status}`,
      );
    }

    const data = await response.json();
    console.log(data.message);
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deleteAllCharacters = async () => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/characters`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete characters");
    }

    if (response.ok) {
      console.log("characters deleted");
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const addAllCharactersToDB = async ({
  charactersData,
}: {
  charactersData: Record<string, CharacterInfo>;
}) => {
  try {
    const characterIds = Object.keys(charactersData);
    const promises = characterIds.map(async (characterId) => {
      const characterInfo = charactersData[characterId];
      await createNewCharacters({
        id: characterId,
        icon: `icon/character/${characterId}.png`,
        rarity: characterInfo.Rarity,
        rank: 0,
        element: characterInfo.Element,
        rankCost: [0, 0, 0, 0, 0, 0],
        cost: 0,
      });
    });

    await Promise.all(promises);

    console.log("All characters added to the database successfully");
    return "All characters added to the database successfully";
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const ensureFreeCharacterExists = async () => {
  try {
    const existingCharacter = await getCharacter(freeCharacter.id);

    if (existingCharacter) {
      console.log("Character already exists:", existingCharacter);
      return existingCharacter;
    }
  } catch (error) {
    console.log("Character not found, adding new one...");
    const newCharacter = await addCharacter(freeCharacter);
    return newCharacter;
  }
};

export const addCharacter = async (character: CharacterData) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/characters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(character),
    });

    if (!response.ok) {
      throw new Error("Failed to add character");
    }

    const createdCharacter = await response.json();
    console.log("Added character:", createdCharacter);

    return createdCharacter;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
