import { DATA_SOURCE_URL } from "@/fetch/api/DATA_SOURCE_URL";
import { CharacterData, LightConeData } from "@/types/interface";

export interface IUserData {
  uid: string;
  nickname: string;
  avatar: {
    id: string;
    name: string;
    icon: string;
  };
  characters: CharacterData[];
  lightCones: LightConeData[];
}

interface ChangeUser {
  uid: string;
  user: IUserData;
}

export const createNewUser = async (userData: IUserData) => {
  try {
    const userExistsResponse = await fetch(
      `${DATA_SOURCE_URL}/users/${userData.uid}`,
    );
    if (userExistsResponse.ok) {
      throw new Error("User with this UID already exists");
    }

    const response = await fetch(`${DATA_SOURCE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create new user");
    }

    const newUser = await response.json();
    console.log("New user created:", newUser);

    return newUser;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getUser = async (uid: string | null) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/users/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create new user");
    }

    const newUser = await response.json();
    console.log("Getted user:", newUser);

    return newUser;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const changeUser = async ({ uid, user }: ChangeUser) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/users/${uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const updatedUser = await response.json();
    console.log("Changed user:", updatedUser);

    return updatedUser;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deleteUser = async (uid: string) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/users/${uid}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    if (response.ok) {
      console.log("User deleted");
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
