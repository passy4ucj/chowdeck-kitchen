import app from "./app";
import Logger from "./logger";
import { createServer } from "http";
import { prisma } from "./client";
const PORT = process.env.PORT || 3000;

// start the express app
const start = async () => {
  try {
    Logger.info("connected to the database");

    const httpServer = createServer(app);

    httpServer.listen(PORT, () => {
      Logger.info(`Server started on port ${PORT} 🔥🔥🔥`);
    });
  } catch (err) {
    Logger.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();
