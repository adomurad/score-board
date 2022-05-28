import { GameEntry } from '../score-provider/game-entry.interface';
import { compareGames } from './compare-games';

function getMockedGame(score1: number, score2: number, date = Date.now()): GameEntry {
  return {
    startDateTimestamp: date,
    homeTeam: {
      teamName: '1',
      score: score1,
    },
    awayTeam: {
      teamName: '2',
      score: score2,
    },
  };
}

describe('compare-games.test.ts tests', () => {

  test('should return the difference in score sums', () => {
    const game1 = getMockedGame(6, 7);
    const game2 = getMockedGame(10, 0);

    const result = compareGames(game1, game2);

    expect(result).toBe(-3);
  });

});