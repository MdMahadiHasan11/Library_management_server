import { FilterQuery } from "mongoose";
import { IBook, IBookDocument, IBookQuery } from "./book.interface";
import { Book } from "./book.model";

export const createBook = async (payload: IBook) => {
  const book = new Book(payload);
  return book.save();
};
export const getBooks = async (query: IBookQuery) => {
  const filter: FilterQuery<IBookDocument> = {};
  if (query.filter) filter.genre = query.filter;

  const sortBy = query.sortBy || "createdAt";
  const sortOrder = query.sort === "asc" ? 1 : -1;
  const limit = Number(query.limit) || 10;

  return Book.find(filter)
    .sort({ [sortBy]: sortOrder })
    .limit(limit);
};

export const BookServices = {
  createBook,
  getBooks,
};
