import { initBoard } from "@/handlers/GameHandler";

test('initBoard context', () => {
    const context = initBoard();

    expect(context.round).toBe(0);
})