import { describe, expect, it } from "vitest";
import { UndercoverGame } from "./game.js";

describe("UndercoverGame", () => {
  it("fills four seats and assigns one undercover", () => {
    const game = new UndercoverGame(() => 0);
    game.start(["你"], 4, { civilian: "咖啡", undercover: "奶茶" });
    expect(game.players).toHaveLength(4);
    expect(game.players.filter((player) => player.role === "undercover")).toHaveLength(1);
  });

  it("eliminates the top-voted player and resolves a civilian win", () => {
    const game = new UndercoverGame(() => 0);
    game.start(["你"], 4, { civilian: "咖啡", undercover: "奶茶" });
    const undercover = game.players.findIndex((player) => player.role === "undercover");
    game.phase = "vote";
    game.vote(undercover);
    expect(game.players[undercover].alive).toBe(false);
    expect(game.winner).toBe("civilian");
  });
});
