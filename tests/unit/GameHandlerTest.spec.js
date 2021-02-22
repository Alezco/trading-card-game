import { initBoard, drawCard } from "@/handlers/GameHandler";

describe("GameHandler", () => {
  describe("initBoard", () => {
    it("should return a correct correct context", () => {
      const context = initBoard();

      expect(context.round).toBe(0);
      expect(context.players.length).toBe(2);
      expect(typeof context.players[0]).toBe("object");
      expect(typeof context.players[1]).toBe("object");
    });
  });

  describe("drawCard", () => {
    it("should draw a card from the deck to the hand", () => {
      const player = {
        id: 1,
        health: 30,
        mana: 0,
        hand: [],
        deck: [{ id: "foo", mana: 2 }]
      };
      const updatedPlayer = drawCard(player);
      expect(updatedPlayer.hand.length).toBe(1);
      expect(updatedPlayer.deck.length).toBe(0);
      expect(updatedPlayer.hand[0]).toStrictEqual({ id: "foo", mana: 2 });
    });
    it("should remove one health point when deck is empty", () => {
      const player = {
        id: 1,
        health: 30,
        mana: 0,
        hand: [],
        deck: []
      };
      const newPlayer = drawCard(player);
      expect(newPlayer.health).toBe(29);
      /*try {
        const newPlayer = drawCard(player);
      } catch (error) {
        expect(error).toStrictEqual(new Error("Empty deck"));
      }*/
    });
    it("should keep 5 cards when hand is full", () => {
      const player = {
        id: 1,
        health: 30,
        mana: 0,
        hand: [
          { id: "1", mana: 2 },
          { id: "2", mana: 5 },
          { id: "3", mana: 1 },
          { id: "4", mana: 0 },
          { id: "5", mana: 1 }
        ],
        deck: [{ id: "6", mana: 8 }]
      };
      const newPlayer = drawCard(player);
      expect(newPlayer.hand.length).toBe(5);
      expect(newPlayer.deck.length).toBe(0);
    });
  });
});
