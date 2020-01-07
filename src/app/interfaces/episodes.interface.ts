interface Episodes {
  info?: Info;
  results: Episode[];
}

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}