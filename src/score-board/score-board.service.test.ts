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

      scoreBoard.startGame('team1', 'team2');
      const result = scoreBoard.getCurrentGame();

      expect(result).not.toBeNull();
    });

    test('should throw when a game is in progress', () => {
      const memoryStore = new MemoryScoreProvider();
      const scoreBoard = new ScoreBoard(memoryStore);

      scoreBoard.startGame('team1', 'team2');

      expect(() => {
        scoreBoard.startGame('team1', 'team2');
      }).toThrowError('cannot start a game while another game is in progress');
    });

    test('team names should be stored and returned', () => {
      const memoryStore = new MemoryScoreProvider();
      const scoreBoard = new ScoreBoard(memoryStore);

      const homeTeamName = 'homeTeam';
      const awayTeamName = 'awayTeam';
      scoreBoard.startGame(homeTeamName, awayTeamName);
      const result = scoreBoard.getCurrentGame();

      expect(result?.homeTeam.teamName).toBe(homeTeamName);
      expect(result?.awayTeam.teamName).toBe(awayTeamName);
    });

    test('initial scores should be 0', () => {
      const memoryStore = new MemoryScoreProvider();
      const scoreBoard = new ScoreBoard(memoryStore);

      scoreBoard.startGame('team1', 'team2');
      const result = scoreBoard.getCurrentGame();

      expect(result?.homeTeam.score).toBe(0);
      expect(result?.awayTeam.score).toBe(0);
    });

  });

});