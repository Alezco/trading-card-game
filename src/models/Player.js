import {createDeck} from "@/models/Deck";

export const createPlayer = (id) => ({
    id,
    health: 30,
    mana: 0,
    hand: [],
    deck: createDeck()
})
