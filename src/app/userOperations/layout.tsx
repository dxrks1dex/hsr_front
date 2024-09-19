import type { PropsWithChildren } from "react";
import { CharactersContextWrapper } from "@/context/useCharactersContext";

export default function UsersPageLayout({
  children,
}: PropsWithChildren<unknown>) {
  return <CharactersContextWrapper>{children}</CharactersContextWrapper>;
}
