export interface TeamScore {
  teamName: string;
  score: number;
}

export interface GameEntry {
  startDateTimestamp: number;
  homeTeam: TeamScore;
  awayTeam: TeamScore;
}
