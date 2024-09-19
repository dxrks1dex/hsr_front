import { createNewCharacters } from "@/fetch/api/characters";
import { CharacterData, LightConeData } from "@/types/interface";
import { DATA_SOURCE_URL } from "@/fetch/api/DATA_SOURCE_URL";

interface LightConeToAdd {
  rank: string;
  baseType: string;
  rarity: number;
  id: string;
  en: string;
  desc: string;
  kr: string;
  cn: string;
  jp: string;
}

interface LightConesToAddData {
  [id: string]: LightConeToAdd;
}

export const getLightCone = async (id: string | null) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/lightcone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get cone");
    }

    const character = await response.json();
    console.log("Got cone:", character);

    return character;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const createNewCones = async (coneData: LightConeData) => {
  try {
    const userExistsResponse = await fetch(
      `${DATA_SOURCE_URL}/lightcone/${coneData.id}`,
    );
    if (userExistsResponse.ok) {
      throw new Error("Cone with this ID already exists");
    }

    const response = await fetch(`${DATA_SOURCE_URL}/lightcones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coneData),
    });

    if (!response.ok) {
      throw new Error("Failed to create new cone");
    }

    const newCharacters = await response.json();
    console.log("New cone created:", newCharacters);

    return newCharacters;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const addAllCones = async (data: LightConesToAddData) => {
  try {
    const coneNames = Object.keys(data);
    const promises = coneNames.map(async (coneId) => {
      const coneData = data[coneId];

      if (coneData.id === "23204") {
        coneData.id = "23024";
      }

      await createNewCones({
        id: coneId,
        name: coneData.en,
        rarity: coneData.rarity,
        rankCost: [0, 0, 0, 0, 0],
        rank: 0,
        cost: 0,
        icon: `icon/light_cone/${coneData.id}.png`,
      });
    });

    await Promise.all(promises);

    console.log("All cones added to the database successfully");
    return "All cones added to the database successfully";
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deleteAllCones = async () => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/lightcones`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete lightcones");
    }

    if (response.ok) {
      console.log("lightcones deleted");
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateConeCost = async (updatedCones: LightConeData[]) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/lightcones`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCones),
    });

    if (!response.ok) {
      throw new Error("Failed to update cost for cones");
    }

    const data = await response.json();
    console.log(data.message);
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
