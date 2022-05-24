import express from "express";
import expressApp from "./express-app";
import env from "./config";
import { databaseConnection } from "./database";

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  await expressApp(app);

  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  })
  .on('error', (err) => {
    console.log(err);
    process.exit();
  });
}

StartServer();