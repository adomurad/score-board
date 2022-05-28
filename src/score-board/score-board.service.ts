import { IScoreProvider } from '../score-provider/score-provider.interface';

export class ScoreBoard {

  constructor(private store: IScoreProvider) { }

  public startGame(): void {
    const newGame = {};
    this.store.setCurrentGame(newGame);
  }

  public getCurrentGame(): null {
    return null;
  }

}