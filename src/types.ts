export interface MovieCompany {
  id: string;
  name: string;
}

export interface MovieData {
  id: string;
  reviews: number[];
  title: string;
  filmCompanyId: string;
  cost: number;
  releaseYear: number;
  averageRating: number;
}

export type Order = "asc" | "desc";
