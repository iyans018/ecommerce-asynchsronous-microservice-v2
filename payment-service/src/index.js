import express from "express";
import expressApp from "./express-app";
import env from "./config";
import { databaseConnection } from "./database";
import { createChannel } from "./utils";

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  const channel = await createChannel();

  await expressApp(app, channel);

  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  })
  .on('error', (err) => {
    console.log(err);
    process.exit();
  });
}

StartServer();