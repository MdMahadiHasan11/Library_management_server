import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { borrowBookRoutes } from "./app/modules/library/borrow/borrow.route";
import { bookRoutes } from "./app/modules/library/book/book.route";
const app: Application = express();

cors({
  origin: (origin, callback) => {
    callback(null, origin || "*");
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowBookRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome serer is running!");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "API not found",
  });
  next();
});

export default app;
