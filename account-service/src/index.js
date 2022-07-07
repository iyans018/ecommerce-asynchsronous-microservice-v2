import express from "express";
import expressApp from "./express-app";
import { databaseConnection } from "./database";
import { createChannel } from "./utils";
import env from './config';

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  const channel = await createChannel();

  await expressApp(app, channel);

  app.listen(env.PORT, () => {
    console.log("Server is running on port 3001");
  })
  .on('error', (err) => {
    console.log(err);
    process.exit();
  })
}

export default StartServer();