import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { auth, users } from "./api";

export default async (app, channel) => {
  const __dirname = path.resolve();
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: "Account Service API Documentation",
      version: "1.0.0",
      description: "Lorem ipsum dolor sir amet",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Local server",
      }
    ]
  };
  const options = {
    swaggerDefinition,
    apis: ['./src/api/*.js'],
  }
  const swaggerSpec = swaggerJSDoc(options);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(__dirname + '/public'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  auth(app, channel);
  users(app);
}