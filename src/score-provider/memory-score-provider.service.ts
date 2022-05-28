import { deepCopy } from '../utils/deepCopy';
import { GameEntry } from './game-entry.interface';
import { IScoreProvider } from './score-provider.interface';

export class MemoryScoreProvider implements IScoreProvider {

  private _currentGame: GameEntry | null;
  private _gameList: GameEntry[];

  constructor() {
    this._currentGame = null;
    this._gameList = [];
  }

  public setCurrentGame(game: GameEntry): void {
    this._currentGame = deepCopy(game);
  }

  public getCurrentGame(): GameEntry | null {
    return deepCopy(this._currentGame);
  }

  public add(game: GameEntry): void {
    this._gameList = [...this._gameList, deepCopy(game)];
  }

  public getAll(): GameEntry[] {
    return deepCopy(this._gameList);
  }
}
