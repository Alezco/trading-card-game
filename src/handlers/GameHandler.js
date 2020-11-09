import {createPlayer} from "@/models/Player";

export const initBoard = () => {
    const player1 = createPlayer("Pablo");
    const player2 = createPlayer("Yannick");
    return [player1, player2];
}
