import { DATA_SOURCE_URL } from "@/fetch/api/DATA_SOURCE_URL";
import { CharacterData } from "@/types/interface";

interface IPlayerPickAndBans {
  characters?: CharacterData[];
  picked: CharacterData[];
  banned: CharacterData[];
  firstCircleCount: number;
  secondCircleCount: number;
  deathCount: number;
  stage?: "pick" | "ban" | null;
  uid: string | null;
  nickname: string;
}

export interface IPickAndBans {
  firstPlayer: IPlayerPickAndBans;
  secondPlayer: IPlayerPickAndBans;
  thirdPlayer: IPlayerPickAndBans;
  fourthPlayer: IPlayerPickAndBans;
}

export const getPickAndBan = async () => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/pickAndBan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get picks and bans");
    }

    const pickAndBan = await response.json();
    console.log("Got picks and bans:", pickAndBan);

    return pickAndBan;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// export const createPickOrBans = async (data: Partial<IPickAndBans>) => {
//   try {
//     const response = await fetch(`${DATA_SOURCE_URL}/pickAndBan/firstPlayer`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//
//     if (!response.ok) {
//       throw new Error("Failed to update picks and bans");
//     }
//
//     return await response.json();
//   } catch (error) {
//     console.error("Error creating picks and bans:", error);
//     throw error;
//   }
// };

export const getFirstPlayer = async () => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/pickAndBan/firstPlayer`);
    if (!response.ok) {
      throw new Error("Failed to fetch first player data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching first player data:", error);
    throw error;
  }
};

export const getSecondPlayer = async () => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/pickAndBan/secondPlayer`);
    if (!response.ok) {
      throw new Error("Failed to fetch second player data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching second player data:", error);
    throw error;
  }
};

export const createPickOrBansForFirstUser = async (
  pickAndBansData: IPlayerPickAndBans,
) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/pickAndBan/firstPlayer`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pickAndBansData),
    });

    if (!response.ok) {
      throw new Error("Failed to create new cone");
    }

    const newCharacters = await response.json();
    console.log("New pick and bans created:", newCharacters);

    return newCharacters;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const createPickOrBansForSecondUser = async (
  pickAndBansData: IPlayerPickAndBans,
) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/pickAndBan/secondPlayer`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pickAndBansData),
    });

    if (!response.ok) {
      throw new Error("Failed to create new cone");
    }

    const newCharacters = await response.json();
    console.log("New pick and bans created:", newCharacters);

    return newCharacters;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const createPickOrBansForThirdUser = async (
  pickAndBansData: IPlayerPickAndBans,
) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/pickAndBan/thirdPlayer`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pickAndBansData),
    });

    if (!response.ok) {
      throw new Error("Failed to create new cone");
    }

    const newCharacters = await response.json();
    console.log("New pick and bans created:", newCharacters);

    return newCharacters;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const createPickOrBansForFourthUser = async (
  pickAndBansData: IPlayerPickAndBans,
) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/pickAndBan/fourthPlayer`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pickAndBansData),
    });

    if (!response.ok) {
      throw new Error("Failed to create new cone");
    }

    const newCharacters = await response.json();
    console.log("New pick and bans created:", newCharacters);

    return newCharacters;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const createPickOrBans = async (pickAndBansData: IPickAndBans) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/pickAndBan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pickAndBansData),
    });

    if (!response.ok) {
      throw new Error("pick and ban created");
    }

    const newCharacters = await response.json();
    console.log("pick and ban created:", newCharacters);

    return newCharacters;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const clearAllPickAndBansForFirstPlayer = async () => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/pickAndBan/firstPlayer`, {
      method: "PUT",
      body: JSON.stringify({
        firstPlayer: {
          characters: [],
          picked: [],
          banned: [],
          firstCircleCount: 0,
          secondCircleCount: 0,
          deathCount: 0,
          stage: null,
          uid: "",
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete pickAndBan");
    }

    if (response.ok) {
      console.log("pickAndBan deleted");
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deleteAllPickAndBans = async () => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/pickAndBan`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete pickAndBan");
    }

    if (response.ok) {
      console.log("pickAndBan deleted");
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
