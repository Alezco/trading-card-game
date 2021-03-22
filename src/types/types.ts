import { Player } from "@/models/Player";

export type Context = {
  round: number;
  players: Player[];
  activePlayerId: string;
};

export type Step = {
  label: string;
  method: (context: Context) => Context;
};

export interface Steps {
  [key: string]: Step;
}
