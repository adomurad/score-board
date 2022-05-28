import { deepCopy } from '../utils/deepCopy';
import { GameEntry } from './game-entry.interface';
import { IScoreProvider } from './score-provider.interface';

export class MemoryScoreProvider implements IScoreProvider {

  private _currentGame: GameEntry | null;

  constructor() {
    this._currentGame = null;
  }

  public setCurrentGame(game: GameEntry): void {
    this._currentGame = deepCopy(game);
  }

  public getCurrentGame(): GameEntry | null {
    return deepCopy(this._currentGame);
  }
}
