import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

import { auth, users } from "./api";

export default async (app) => {
  const __dirname = path.resolve();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(__dirname + '/public'));

  auth(app);
  users(app);
}