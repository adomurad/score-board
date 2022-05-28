import { GameEntry } from '../score-provider/game-entry.interface';

export function compareGames(a: GameEntry, b: GameEntry): number {
  const aScoreSum = sumScores(a);
  const bScoreSum = sumScores(b);

  if (aScoreSum === bScoreSum) {
    const deb1 = b.startDateTimestamp - a.startDateTimestamp;
    return deb1;
  }

  return bScoreSum - aScoreSum;
}

function sumScores(game: GameEntry): number {
  return game.homeTeam.score + game.awayTeam.score;
}
