import {createPlayer} from "@/models/Player";

export const initBoard = () => {
    const player1 = createPlayer("Pablo");
    const player2 = createPlayer("Yannick");
    return {
        players:[player1, player2]
    };
}


export const drawCard = player => {
    const [drawnCard,...newDeck] = player.deck
    return {
        ...player,
        deck: newDeck,
        hand: [...player.hand, drawnCard]
    }
}