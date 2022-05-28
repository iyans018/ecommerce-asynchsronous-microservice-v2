import express from "express";
import cors from "cors";
import path from "path";

import { order } from "./api";

export default async (app) => {
  const __dirname = path.resolve();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.static(__dirname + '/public'));

  order(app);
}