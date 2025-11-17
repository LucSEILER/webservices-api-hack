require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 3000;
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./docs/openapi.yaml");
const initBookRoutes = require("./api/routes");
const cors = require("cors");
const helmet = require("helmet");

const allowedOrigins = ["https://library-app.example.com"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use(helmet());
app.use(helmet.frameguard({ action: "deny" }));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  })
);

app.use(express.json());

app.use((req, res, next) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    if (!req.is("application/json")) {
      return res.status(415).json({ message: "Content-Type must be application/json" });
    }
  }
  next();
});

app.use("/api-docs", (req, res, next) => {
  const origin = req.get("origin");
  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).send("Forbidden");
  }
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

function errorHandler(err, req, res, next) {
  console.error("Error:", err);

  res.status(500).json({ message: "Unexpected error occurred." });
}

app.use(errorHandler);

initBookRoutes(app, process.env.API_VERSION);

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
});

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
