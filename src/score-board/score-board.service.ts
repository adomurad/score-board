import { GameEntry } from '../score-provider/game-entry.interface';
import { IScoreProvider } from '../score-provider/score-provider.interface';
import { compareGames } from './compare-games';

export class ScoreBoard {

  constructor(private store: IScoreProvider) { }

  public startGame(homeTeamName: string, awayTeamName: string): void {
    const currentGame = this.store.getCurrentGame();
    if (currentGame) {
      throw new Error('cannot start a game while another game is in progress');
    }

    const newGame = this.createNewGameEntry(homeTeamName, awayTeamName);
    this.store.setCurrentGame(newGame);
  }

  public getCurrentGame(): GameEntry | null {
    const currentGame = this.store.getCurrentGame();
    return currentGame;
  }

  public updateScore(homeTeamScore: number, awayTeamScore: number): void {
    const currentGame = this.store.getCurrentGame();
    if (!currentGame) {
      throw new Error('cannot update a game while no game is in progress');
    }

    if (homeTeamScore < 0 || awayTeamScore < 0) {
      throw new Error('score cannot be a negative number');
    }

    currentGame.homeTeam.score = homeTeamScore;
    currentGame.awayTeam.score = awayTeamScore;

    this.store.setCurrentGame(currentGame);
  }

  public finishGame(): void {
    const currentGame = this.store.getCurrentGame();
    if (!currentGame) {
      throw new Error('cannot finish a game while no game is in progress');
    }

    this.store.removeCurrentGame();
    this.store.add(currentGame);
  }

  public getSummary(): GameEntry[] {
    const gameList = this.store.getAll();

    // new array just to be safe - sort mutates the array in place
    const sortedGameList = [...gameList].sort(compareGames);
    return sortedGameList;
  }

  private createNewGameEntry(homeTeamName: string, awayTeamName: string): GameEntry {
    return {
      startDateTimestamp: Date.now(),
      homeTeam: {
        teamName: homeTeamName,
        score: 0,
      },
      awayTeam: {
        teamName: awayTeamName,
        score: 0,
      }
    };
  }
}