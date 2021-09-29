import { initBoard, drawCard } from "@/handlers/GameHandler";

describe("GameHandler", () => {
  let player1, player2, context;
  beforeEach(() => {
    player1 = {
      id: "player1",
      name: "Pablo",
      health: 30,
      mana: 5,
      hand: [
        { id: "foooo", mana: 2 },
        { id: "fooo", mana: 5 }
      ],
      deck: {
        cards: [{ id: "foo", mana: 2, playerId: "player1" }],
        playerId: "player1"
      }
    };

    player2 = {
      id: "player2",
      name: "Yannick",
      health: 30,
      mana: 7,
      hand: [],
      deck: {
        cards: [{ id: "foo", mana: 2, playerId: "player2" }],
        playerId: "player2"
      }
    };

    context = {
      round: 1,
      players: { player1, player2 },
      activePlayerId: player1.id
    };
  });
  describe("initBoard", () => {
    it("should return a correct context", () => {
      const context = initBoard();

      expect(context.round).toBe(1);
      expect(Object.keys(context.players).length).toBe(2);
      expect(typeof context.players).toBe("object");
    });
  });

  describe("drawCard", () => {
    it("should draw a card from the deck to the hand", () => {
      const localPlayer = {
        ...player1,
        hand: [],
        deck: {
          cards: [{ id: "foo", mana: 2, playerId: player1.id }],
          playerId: player1.id
        }
      };
      const updatedPlayer = drawCard(localPlayer);
      expect(updatedPlayer.hand.length).toBe(1);
      expect(updatedPlayer.deck.cards.length).toBe(0);
      expect(updatedPlayer.hand[0]).toStrictEqual({
        id: "foo",
        mana: 2,
        playerId: player1.id
      });
    });
    it("should remove one health point when deck is empty", () => {
      const localPlayer = {
        ...player1,
        hand: [],
        deck: {
          cards: [],
          playerId: player1.id
        }
      };
      const newPlayer = drawCard(localPlayer);
      expect(newPlayer.health).toBe(29);
    });
    it("should keep 5 cards when hand is full", () => {
      const localPlayer = {
        ...player1,
        hand: [
          { id: "1", mana: 2 },
          { id: "2", mana: 5 },
          { id: "3", mana: 1 },
          { id: "4", mana: 0 },
          { id: "5", mana: 1 }
        ],
        deck: {
          cards: [{ id: "6", mana: 8, playerId: player1.id }],
          playerId: player1.id
        }
      };
      const newPlayer = drawCard(localPlayer);
      expect(newPlayer.hand.length).toBe(5);
      expect(newPlayer.deck.cards.length).toBe(0);
    });
  });
});
