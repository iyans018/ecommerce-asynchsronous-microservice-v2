import express from "express";
import expressApp from "./express-app";

const StartServer = async () => {
  const app = express();

  await expressApp(app);

  app.listen(3002, () => {
    console.log("Server running on port 3002");
  })
  .on('error', (err) => {
    console.log(err);
    process.exit();
  });
}

StartServer();