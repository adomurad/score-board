export interface TeamScore {
  teamName: string;
  score: number;
}

export interface GameEntry {
  homeTeam: TeamScore;
  awayTeam: TeamScore;
}
