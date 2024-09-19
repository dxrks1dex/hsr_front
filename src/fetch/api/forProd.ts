import { DATA_SOURCE_URL } from "@/fetch/api/DATA_SOURCE_URL";
import { IPickAndBans } from "@/fetch/api/pickAndBans";

interface ForProdData {
  firstPlayerNickname?: string;
  firstPlayerPenaltyCircles?: number;
  secondPlayerNickname?: string;
  secondPlayerPenaltyCircles?: number;

  firstPicture?: string;
  secondPicture?: string;
  thirdPicture?: string;

  firstCommentator?: string;
  secondCommentator?: string;

  messageTitle?: string;
  messageText?: string;
  isMessageVisible?: boolean;
}

export const createDataForProd = async (forProdData: ForProdData) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/forProd`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forProdData),
    });

    if (!response.ok) {
      throw new Error("Failed to create new prod data");
    }

    const newProdData = await response.json();
    console.log("New pick and prod data:", newProdData);

    return newProdData;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const createForProd = async () => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/forProd`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstPlayerNickname: "",
        firstPlayerPenaltyCircles: 0,
        secondPlayerNickname: "",
        secondPlayerPenaltyCircles: 0,
        firstPicture: "",
        secondPicture: "",
        firstCommentator: "",
        secondCommentator: "",
      }),
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

export const deleteAllForProdData = async () => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/forProd`, {
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
