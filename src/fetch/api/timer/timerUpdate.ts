import { DATA_SOURCE_URL } from "@/fetch/api/DATA_SOURCE_URL";

export const applyTimer = async (
  penaltyMinutes: number,
  penaltySeconds: number,
  mainMinutes: number,
  mainSeconds: number,
) => {
  try {
    const response = await fetch(`${DATA_SOURCE_URL}/timer/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        penaltyTimer: {
          minutes: penaltyMinutes,
          seconds: penaltySeconds,
        },
        mainTimer: {
          minutes: mainMinutes,
          seconds: mainSeconds,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("error of update tiner");
    }

    const data = await response.json();
    console.log("Timer updated:", data);
  } catch (error) {
    console.error("Ошибка:", error);
  }
};
