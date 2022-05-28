import { GameEntry } from './game-entry.interface';
import { IScoreProvider } from './score-provider.interface';

export class MemoryScoreProvider implements IScoreProvider {

  private _currentGame: GameEntry | null;

  constructor() {
    this._currentGame = null;
  }

  public setCurrentGame(game: GameEntry): void {
    this._currentGame = game;
  }

  public getCurrentGame(): GameEntry | null {
    return this._currentGame;
  }
}
