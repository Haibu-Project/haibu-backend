import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Social Network API",
    version: "1.0.0",
    description: "API documentation for the Social Network backend",
  },
  servers: [{ url: "http://localhost:4444" }],
};

const options = {
  swaggerDefinition,
  apis: ["./src/modules/**/*.routes.ts"], // Escanea archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
