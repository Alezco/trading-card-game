import { Player } from "@/models/Player";

export type StepLabel = "initRound" | "playerActions" | "endRound";

export type Players = { [id: string]: Player };

export type Error = {
  message: string | null;
};

export type Context = {
  round: number;
  players: Players;
  activePlayerId: string | null;
  error: Error | null;
};

export type Step = {
  label: StepLabel;
  method: (context: Context) => Context;
};

export interface Steps {
  [key: string]: Step;
}
