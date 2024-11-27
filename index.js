import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { notFound } from "./errors/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import routes from "./routes/index.js";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Helmet for securing HTTP headers
app.use(helmet());

// Gzip compression for request/response optimization
app.use(compression());

// routes
app.use("/api", routes.schoolRouter);
app.use('/', (req, res) => res.send(`School Management API is working`))

// error handlers
app.use(notFound);
app.use(errorHandler);

const server = createServer(app);
server.listen(PORT);

server.on("listening", () =>
  console.log(`Server is listening on port http://localhost:${PORT}`)
);

server.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
});
