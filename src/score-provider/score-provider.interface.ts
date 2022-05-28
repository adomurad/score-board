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

  /**
   * Removes the current game from the store
   */
  removeCurrentGame(): void;

  /**
   * Add a finished game to store
   * @param game the game to add
   */
  add(game: GameEntry): void;

  /**
   * Get all game entries from the store
   * @returns game entries
   */
  getAll(): GameEntry[];
}
