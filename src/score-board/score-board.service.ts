import { GameEntry } from '../score-provider/game-entry.interface';
import { IScoreProvider } from '../score-provider/score-provider.interface';

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

    currentGame.homeTeam.score = homeTeamScore;
    currentGame.awayTeam.score = awayTeamScore;

    this.store.setCurrentGame(currentGame);
  } 

  private createNewGameEntry(homeTeamName: string, awayTeamName: string): GameEntry {
    return {
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