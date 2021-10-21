import { Player } from "@/models/Player";

export type Players = { [id: string]: Player };

export type Error = {
  message: string | null;
};

export type Context = {
  round: number;
  players: Players;
  activePlayerId: string | null;
  error: Error | null;
  winner: string | null;
};
