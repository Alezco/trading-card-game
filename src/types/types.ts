import { Player } from "@/models/Player";

export type Context = {
  round: number;
  players: Player[];
};
