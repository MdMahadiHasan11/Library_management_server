import { NextFunction, Request, Response } from "express";
import { BookServices } from "./book.services";
import { sendResponse } from "../../../utils/sendResponse";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await BookServices.createBook(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
