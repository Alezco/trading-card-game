import { initBoard, drawCard, handleAction } from "@/handlers/GameHandler";
// import { getPlayerById } from "@/utils/player";

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
      deck: [{ id: "foo", mana: 2 }]
    };

    player2 = {
      id: "player2",
      name: "Yannick",
      health: 30,
      mana: 7,
      hand: [],
      deck: [{ id: "foo", mana: 2 }]
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

  describe("handleAction", () => {
    it("should do nothing if player is not active (current)", () => {
      const getPlayerById = jest.fn();
      handleAction(context, player2.hand[0], player2.id);
      expect(getPlayerById).not.toHaveBeenCalled();
    });

    it("should remove card from hand", () => {
      const firstPlayerHandCardId = player1.hand[0].id;
      handleAction(context, player1.hand[0], player1.id);
      expect(player1.hand.find(({ id }) => id === firstPlayerHandCardId)).toBe(
        undefined
      );
    });

    it("should remove player mana", () => {
      handleAction(context, player1.hand[0], player1.id);
      expect(player1.mana).toBe(3);
    });

    it("should attack enemy", () => {
      handleAction(context, player1.hand[0], player1.id);
      expect(player2.health).toBe(28);
    });
  });

  describe("drawCard", () => {
    it("should draw a card from the deck to the hand", () => {
      const localPlayer = {
        ...player1,
        hand: [],
        deck: [{ id: "foo", mana: 2 }]
      };
      const updatedPlayer = drawCard(localPlayer);
      expect(updatedPlayer.hand.length).toBe(1);
      expect(updatedPlayer.deck.length).toBe(0);
      expect(updatedPlayer.hand[0]).toStrictEqual({ id: "foo", mana: 2 });
    });
    it("should remove one health point when deck is empty", () => {
      const localPlayer = {
        ...player1,
        hand: [],
        deck: []
      };
      const newPlayer = drawCard(localPlayer);
      expect(newPlayer.health).toBe(29);
      /*try {
        const newPlayer = drawCard(player);
      } catch (error) {
        expect(error).toStrictEqual(new Error("Empty deck"));
      }*/
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
        deck: [{ id: "6", mana: 8 }]
      };
      const newPlayer = drawCard(localPlayer);
      expect(newPlayer.hand.length).toBe(5);
      expect(newPlayer.deck.length).toBe(0);
    });
  });
});
