import {createPlayer} from "@/models/Player";

export const initBoard = () => {
    const player1 = createPlayer("Pablo");
    const player2 = createPlayer("Yannick");

    return {
        round: 0,
        players:[player1, player2]
    };
}

const drawCard = player => {
    const [drawnCard,...newDeck] = player.deck
    return {
        ...player,
        deck: newDeck,
        hand: [...player.hand, drawnCard]
    }
}

const firstDraw = players => {
    return players.map( player => {
        player = drawCard(player);
        player = drawCard(player);
        player = drawCard(player);

        return player;
    })
}

const initRound = context => {
    const players = 0 === context.round ? firstDraw(context.players) : players.map( player => drawCard(player) ); // Last line added

    return {
        ...context,
        players
    };
}

const playerActions = context => {
    return context;
}

const endRound = context => {
    return context;
}

const steps = [
    initRound,
    playerActions,
    endRound
]

export const gameLoop = context => {
    let finalContext;

    steps.forEach( step => finalContext = step(context) );  

    return finalContext;
}