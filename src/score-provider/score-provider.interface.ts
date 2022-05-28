import { GameEntry } from './game-entry.interface';

export interface IScoreProvider {

  /**
   * Sets the current game in the store
   * @param game the current game
   */
  setCurrentGame(game: GameEntry): void;

  /**
   * Get the current game from the store
   * @returns current game entry or `null` when empty
   */
  getCurrentGame(): GameEntry | null;

}