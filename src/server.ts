// src/server.ts
import { Server as HttpServer } from "http";
import app from "./app";
import "dotenv/config";
import { connectDB } from "./config/db";
// import { connectDB } from "./config/db";

const port = process.env.PORT || 5000;
let server: HttpServer;

async function startServer() {
  await connectDB();

  server = app.listen(port, () => {
    console.log(`🚀 Server started at http://localhost:${port}`);
  });
}

startServer();
