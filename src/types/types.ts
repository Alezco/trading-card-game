import { Player } from "@/models/Player";

export type StepLabel = "initRound" | "playerActions" | "endRound";

export type Context = {
  round: number;
  players: Player[];
  activePlayerId: string;
};

export type Step = {
  label: StepLabel;
  method: (context: Context) => Context;
};

export interface Steps {
  [key: string]: Step;
}
