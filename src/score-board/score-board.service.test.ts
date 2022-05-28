import { MemoryScoreProvider } from '../score-provider/memory-score-provider.service';
import { ScoreBoard } from './score-board.service';

describe('score-board.service.ts tests', () => {

  test('initial score board should not have a game in progress', () => {
    const memoryStore = new MemoryScoreProvider();
    const scoreBoard = new ScoreBoard(memoryStore);

    const result = scoreBoard.getCurrentGame();

    expect(result).toBeNull();
  });

  describe('when starting a game', () => {

    test('should be able to get current game', () => {
      const memoryStore = new MemoryScoreProvider();
      const scoreBoard = new ScoreBoard(memoryStore);

      scoreBoard.startGame();
      const result = scoreBoard.getCurrentGame();

      expect(result).not.toBeNull();
    });

  });

});