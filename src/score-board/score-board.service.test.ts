import { ScoreBoard } from "./score-board.service";

describe('score-board.service.ts tests', () => {

  test('initial score board should not have a game in progress', () => {
    const scoreBoard = new ScoreBoard();

    const result = scoreBoard.getCurrentGame();

    expect(result).toBeNull();
  });

});