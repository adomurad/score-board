import { GameEntry } from '../score-provider/game-entry.interface';
import { IScoreProvider } from '../score-provider/score-provider.interface';

export class ScoreBoard {

  constructor(private store: IScoreProvider) { }

  public startGame(): void {
    const newGame = {};
    this.store.setCurrentGame(newGame);
  }

  public getCurrentGame(): GameEntry | null {
    const currentGame = this.store.getCurrentGame();
    return currentGame;
  }

}