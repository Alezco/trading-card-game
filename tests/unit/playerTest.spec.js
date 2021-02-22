import { isDeckEmpty, isDrawable, isHandFull } from "@/utils/player";

describe("Player utils", () => {
  describe("isDeckEmpty", () => {
    it("should return true when deck is empty", () => {
      const player = {
        id: 1,
        health: 30,
        mana: 0,
        hand: [],
        deck: []
      };
      expect(isDeckEmpty(player)).toBeTruthy();
    });

    it("should return false when deck is not empty", () => {
      const player = {
        id: 1,
        health: 30,
        mana: 0,
        hand: [],
        deck: [{ id: "Jest", mana: 8 }]
      };
      expect(isDeckEmpty(player)).toBeFalsy();
    });
  });

  describe("isHandFull", () => {
    it("should return true when hand is full", () => {
      const player = {
        id: 1,
        health: 30,
        mana: 0,
        hand: [
          { id: "Hassan", mana: 1 },
          { id: "Benjamin", mana: 0 },
          { id: "Marianne", mana: 8 },
          { id: "Julien", mana: 1 },
          { id: "Benji", mana: 5 }
        ],
        deck: []
      };
      expect(isHandFull(player)).toBeTruthy();
    });

    it("should return false when hand is not full", () => {
      const player = {
        id: 1,
        health: 30,
        mana: 0,
        hand: [
          { id: "Hassan", mana: 1 },
          { id: "Benjamin", mana: 0 }
        ],
        deck: [{ id: "Jest", mana: 8 }]
      };
      expect(isHandFull(player)).toBeFalsy();
    });
  });

  describe("isDrawable", () => {
    it("should return true when hand is not full and deck is not empty", () => {
      const player = {
        id: 1,
        health: 30,
        mana: 0,
        hand: [
          { id: "Hassan", mana: 1 },
          { id: "Benjamin", mana: 0 },
          { id: "Benji", mana: 5 }
        ],
        deck: [{ id: "Hassan", mana: 1 }]
      };
      expect(isDrawable(player)).toBeTruthy();
    });

    it("should return false when hand is full and deck is empty", () => {
      const player = {
        id: 1,
        health: 30,
        mana: 0,
        hand: [
          { id: "Hassan", mana: 1 },
          { id: "Benjamin", mana: 0 },
          { id: "Marianne", mana: 8 },
          { id: "Julien", mana: 1 },
          { id: "Benji", mana: 5 }
        ],
        deck: []
      };
      expect(isDrawable(player)).toBeFalsy();
    });
  });
});
