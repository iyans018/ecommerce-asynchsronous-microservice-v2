import express from "express";
import path from "path";

export default async (app) => {
  const __dirname = path.resolve();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname + '/public'));
}