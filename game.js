export class UndercoverGame {
  constructor(random = Math.random) {
    this.random = random;
    this.players = [];
    this.phase = "idle";
    this.turn = 0;
    this.winner = null;
    this.words = null;
  }

  start(names = ["你"], count = 4, words) {
    const bots = ["阿墨", "小羽", "豆仔", "米果", "青禾"];
    const size = Math.max(4, Math.min(6, count));
    this.words = words;
    this.players = Array.from({ length: size }, (_, index) => ({
      name: names[index] || bots[index - names.length] || `AI ${index}`,
      ai: !names[index],
      alive: true,
      role: "civilian",
      word: words.civilian,
    }));
    const undercover = Math.floor(this.random() * size);
    this.players[undercover].role = "undercover";
    this.players[undercover].word = words.undercover;
    this.phase = "describe";
    this.turn = 0;
    this.winner = null;
  }

  describe() {
    if (this.phase !== "describe") return;
    const next = this.players.findIndex((player, index) => index > this.turn && player.alive);
    if (next < 0) this.phase = "vote";
    else this.turn = next;
  }

  vote(index) {
    if (this.phase !== "vote" || !this.players[index]?.alive) return false;
    this.players[index].alive = false;
    const spies = this.players.filter((p) => p.alive && p.role === "undercover").length;
    const civilians = this.players.filter((p) => p.alive && p.role === "civilian").length;
    if (!spies) this.winner = "civilian";
    else if (spies >= civilians) this.winner = "undercover";
    this.phase = this.winner ? "done" : "describe";
    this.turn = this.players.findIndex((p) => p.alive);
    return true;
  }
}
