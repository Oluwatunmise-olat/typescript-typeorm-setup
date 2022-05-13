import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import * as morgan from "morgan";

import {
  userRouter as userRoutes,
  postRouter as postRoutes,
  errorRouter as errorRoute,
} from "./routes";

const app = express();

if (process.env.NODE_ENV == "development") {
  app.use(morgan.default(":method :url :status :res[content-length]"));
}

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

const routePrefix = "/v1";

app.use(`${routePrefix}/users`, userRoutes);
app.use(`${routePrefix}/posts`, postRoutes);

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return res.status(404).send("Resource Not Found");
  }
);

app.use(errorRoute);

export default app;
