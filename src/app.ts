import express, { Application, NextFunction, Request, Response } from "express";
import { noteRoutes } from "./app/controllers/notes.controller";
import { userRoutes } from "./app/controllers/users.controller";
import cors from "cors";
const app: Application = express();

cors({
  origin: (origin, callback) => {
    callback(null, origin || "*");
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/notes", noteRoutes);
app.use("/users", userRoutes);
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
