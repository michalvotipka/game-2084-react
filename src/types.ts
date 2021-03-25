export type TPlayer = {
  id: number;
  name: string;
  email: string;
};

export type TScore = {
  player: TPlayer;
  score: number;
  id: string;
};


export type Game = {
  state: number[][],
  score: number,
  finished: boolean
}

export type Direction = "Up" | "Down" | "Left" | "Right" | undefined;

export type GameInput = {
  state: number[][],
  score: number,
  direction: Direction
}