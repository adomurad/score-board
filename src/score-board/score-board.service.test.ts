import { GameEntry } from '../score-provider/game-entry.interface';
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

    test('the game should record current start date', () => {
      const mockTimestamp = new Date('2022-05-28T18:30:50.000Z').getTime();
      const spy = jest
        .spyOn(global.Date, 'now')
        .mockImplementation(() => mockTimestamp);

      const memoryStore = new MemoryScoreProvider();
      const scoreBoard = new ScoreBoard(memoryStore);

      scoreBoard.startGame('team1', 'team2');
      const result = scoreBoard.getCurrentGame();

      spy.mockRestore();

      expect(result?.startDateTimestamp).toBe(mockTimestamp);
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


  describe('when updating score', () => {

    test('should throw when no game is in progress', () => {
      const memoryStore = new MemoryScoreProvider();
      const scoreBoard = new ScoreBoard(memoryStore);

      expect(() => {
        scoreBoard.updateScore(5, 2);
      }).toThrowError('cannot update a game while no game is in progress');
    });

    test('should update both scores', () => {
      const memoryStore = new MemoryScoreProvider();
      const scoreBoard = new ScoreBoard(memoryStore);

      const newHomeTeamScore = 10;
      const newAwayTeamScore = 20;

      scoreBoard.startGame('team1', 'team2');
      scoreBoard.updateScore(newHomeTeamScore, newAwayTeamScore);
      const result = scoreBoard.getCurrentGame();

      expect(result?.homeTeam.score).toBe(newHomeTeamScore);
      expect(result?.awayTeam.score).toBe(newAwayTeamScore);
    });

    test('should be able to set scores to 0', () => {
      const memoryStore = new MemoryScoreProvider();
      const scoreBoard = new ScoreBoard(memoryStore);

      scoreBoard.startGame('team1', 'team2');
      scoreBoard.updateScore(0, 0);
      const result = scoreBoard.getCurrentGame();

      expect(result?.homeTeam.score).toBe(0);
      expect(result?.awayTeam.score).toBe(0);
    });

    test('should throw when homeTeam score is lower than 0', () => {
      const memoryStore = new MemoryScoreProvider();
      const scoreBoard = new ScoreBoard(memoryStore);

      scoreBoard.startGame('team1', 'team2');

      expect(() => {
        scoreBoard.updateScore(-1, 0);
      }).toThrowError('score cannot be a negative number');
    });

    test('should throw when awayTeam score is lower than 0', () => {
      const memoryStore = new MemoryScoreProvider();
      const scoreBoard = new ScoreBoard(memoryStore);

      scoreBoard.startGame('team1', 'team2');

      expect(() => {
        scoreBoard.updateScore(0, -1);
      }).toThrowError('score cannot be a negative number');
    });

  });


  describe('when finishing a game', () => {

    test('should add the game to summary', () => {
      const memoryStore = new MemoryScoreProvider();
      const scoreBoard = new ScoreBoard(memoryStore);

      scoreBoard.startGame('team1', 'team2');
      scoreBoard.finishGame();
      const result = scoreBoard.getSummary();

      expect(result).toHaveLength(1);
      expect(result[0].homeTeam.teamName).toBe('team1');
      expect(result[0].awayTeam.teamName).toBe('team2');
    });

    test('should remove the current game', () => {
      const memoryStore = new MemoryScoreProvider();
      const scoreBoard = new ScoreBoard(memoryStore);

      scoreBoard.startGame('team1', 'team2');
      scoreBoard.finishGame();
      const result = scoreBoard.getCurrentGame();

      expect(result).toBeNull();
    });

    test('should throw when no game in progress', () => {
      const memoryStore = new MemoryScoreProvider();
      const scoreBoard = new ScoreBoard(memoryStore);

      expect(() => {
        scoreBoard.finishGame();
      }).toThrowError('cannot finish a game while no game is in progress');
    });

  });


  describe('summary', () => {

    test('initial summary should be empty', () => {
      const memoryStore = new MemoryScoreProvider();
      const scoreBoard = new ScoreBoard(memoryStore);

      const result = scoreBoard.getSummary();

      expect(result).toHaveLength(0);
    });

    test('should be sorted by score sum', () => {
      const memoryStore = new MemoryScoreProvider();

      const game1: GameEntry = {
        startDateTimestamp: 1,
        homeTeam: {
          teamName: 'game1-team1',
          score: 7,
        },
        awayTeam: {
          teamName: 'game1-team2',
          score: 0,
        },
      }

      const game2: GameEntry = {
        startDateTimestamp: 2,
        homeTeam: {
          teamName: 'game2-team1',
          score: 6,
        },
        awayTeam: {
          teamName: 'game2-team2',
          score: 5,
        },
      }

      const game3: GameEntry = {
        startDateTimestamp: 3,
        homeTeam: {
          teamName: 'game3-team1',
          score: 4,
        },
        awayTeam: {
          teamName: 'game3-team2',
          score: 4,
        },
      }

      memoryStore.add(game1);
      memoryStore.add(game2);
      memoryStore.add(game3);

      const scoreBoard = new ScoreBoard(memoryStore);

      const result = scoreBoard.getSummary();

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual(game2);
      expect(result[1]).toEqual(game3);
      expect(result[2]).toEqual(game1);
    });

  });

});