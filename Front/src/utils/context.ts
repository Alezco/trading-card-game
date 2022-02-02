export const isActivePlayer = (id: string, playerId: string): boolean =>
  id === playerId;

export enum GameState {
  INIT = 0,
  WAITING = 1,
  PLAYING = 2,
  DONE = 3,
  ERROR = 4,
}
