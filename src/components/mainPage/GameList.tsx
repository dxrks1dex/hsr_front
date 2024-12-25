import React from "react";
import styled from "styled-components";
import { deletePickAndBanById, IPickAndBans } from "@/fetch/api/pickAndBans";
import { usePathname, useRouter } from "next/navigation";

// Стили для одной игры
const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border: 1px solid #555;
  border-radius: 6px;
  background-color: #2e2e3e; // Тёмно-серый фон
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

// Стили для блока игроков
const Players = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #e0e0e0; // Светлый текст
`;

// Стили для кнопок
const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;

  button {
    padding: 5px 10px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    background-color: #444; // Тёмный фон кнопок
    color: #fff; // Светлый текст кнопок

    &:hover {
      background-color: #555; // Светлее при наведении
    }

    &.delete {
      background-color: #ff4d4f;
      color: #fff;

      &:hover {
        background-color: #ff7875;
      }
    }
  }
`;

export const GamesList = ({ game }: { game: IPickAndBans }) => {
  const router = useRouter();

  return (
    <GameCard key={game._id}>
      <Players>
        {game?.firstPlayer?.nickname} + {game?.thirdPlayer?.nickname} vs{" "}
        {game?.secondPlayer?.nickname} + {game?.fourthPlayer?.nickname}
      </Players>
      <ButtonGroup>
        <button
          onClick={() =>
            router.push(
              `/q?gameId=${game._id}&user1=${game?.firstPlayer?.uid}&user2=${game.thirdPlayer.uid}&user3=${game?.secondPlayer?.uid}&user4=${game.fourthPlayer.uid}`,
            )
          }
        >
          To edit first state
        </button>
        <button
          onClick={() => router.push(`/pickedOutput/q?gameId=${game._id}`)}
        >
          To edit second state
        </button>
        <button
          onClick={() => router.push(`/pick-and-bans/q?gameId=${game._id}`)}
        >
          To spectate first state
        </button>
        <button
          onClick={() => router.push(`/pickedProdOutput/q?gameId=${game._id}`)}
        >
          To spectate second state
        </button>
        <button
          className="delete"
          onClick={() => game._id && deletePickAndBanById(game._id)}
        >
          Delete game
        </button>
      </ButtonGroup>
    </GameCard>
  );
};
