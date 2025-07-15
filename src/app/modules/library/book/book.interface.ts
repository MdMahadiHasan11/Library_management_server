export type IGenre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export type IBookQuery = {
  filter?: IGenre;
  sortBy?: string;
  sort?: "asc" | "desc";
  limit?: number;
  page?: number;
};
export interface IBookMethods {
  updateAvailability(): Promise<IBookDocument>;
}

export type IBook = {
  title: string;
  author: string;
  genre: IGenre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
};

export type IBookDocument = IBook & Document & IBookMethods;
