import { GameEntry } from '../score-provider/game-entry.interface';
import { IScoreProvider } from '../score-provider/score-provider.interface';

export class ScoreBoard {

  constructor(private store: IScoreProvider) { }

  public startGame(homeTeamName: string, awayTeamName: string): void {
    const newGame = this.createNewGameEntry(homeTeamName, awayTeamName);
    this.store.setCurrentGame(newGame);
  }

  public getCurrentGame(): GameEntry | null {
    const currentGame = this.store.getCurrentGame();
    return currentGame;
  }

  private createNewGameEntry(homeTeamName: string, awayTeamName: string): GameEntry {
    return {
      homeTeam: {
        teamName: homeTeamName,
      },
      awayTeam: {
        teamName: awayTeamName,
      }
    };
  }
}