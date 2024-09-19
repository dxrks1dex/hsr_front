import { Dispatch, SetStateAction } from "react";
import { LightConeData } from "@/types/interface";

interface Props {
  coneId: string;
  coneFromDB: LightConeData[];
  coneForUser: LightConeData[];

  setConeFromDB: Dispatch<SetStateAction<LightConeData[]>>;
  setConeForUser: Dispatch<SetStateAction<LightConeData[]>>;
}

export const onConeChoose = ({
  coneFromDB,
  setConeFromDB,
  setConeForUser,
  coneForUser,
  coneId,
}: Props) => {
  const selectedCone = coneFromDB.find((cone) => cone.id === coneId);

  if (!selectedCone) {
    console.error("Cone not found");
    return;
  }

  // if (coneForUser.some((cone) => cone.id === coneId)) {
  //   console.log("Cone already chosen");
  //   return;
  // }

  setConeForUser((prevCones) => [...prevCones, selectedCone]);

  // No need to update coneFromDB to remove the selected cone
  // setConeFromDB((prevCones) => prevCones.filter((cone) => cone.id !== coneId));

  console.log(coneForUser);
};
