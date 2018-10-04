const express = require("express");
const router = express.Router();

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md

var host = "http://" + process.env.IP + ":" + process.env.PORT;

var swaggerDefinition = {
  swagger: "2.0.0",
  info: {
    title: "domain - Swagger",
    version: "1.0.0",
    description: "REST API with Swagger doc",
    contact: {
      email: "contact@domain.com"
    }
  },
  // tags: [
  //   {
  //     name: 'stocks',
  //     description: 'Stocks API'
  //   }
  // ],
  // host: host, // Host (optional)
  schemes: ["https"],
  basePath: "/api",
  produces: ["application/json", "application/xml", "text/plain", "text/html"],
  securityDefinitions: {
    oauth2: {
      type: "oauth2",
      flow: "password",
      authorizationUrl: "http://petstore.swagger.wordnik.com/oauth/authorize",
      tokenUrl: "http://petstore.swagger.wordnik.com/oauth/token"
    }
  }
};

// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // Path to the API docs
  apis: ["./docs/*/*.*"]
};

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

require("swagger-model-validator")(swaggerSpec);

router.get("/json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

function validateModel(name, model) {
  const responseValidation = swaggerSpec.validateModel(
    name,
    model,
    false,
    true
  );
  if (!responseValidation.valid) {
    console.error(responseValidation.errors);
    throw new Error(`Model doesn't match Swagger contract`);
  }
}

module.exports = {
  router,
  validateModel
};
