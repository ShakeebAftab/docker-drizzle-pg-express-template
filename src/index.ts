import "dotenv/config";
import express, { json } from "express";
import { EnvKeys, getEnvValue } from "./utils/envHandler";
import cors from "cors";
import morgan from "morgan";
import { respHandler } from "./utils/respHandler";
import router from "./routes";

const PORT = getEnvValue(EnvKeys.port);
const app = express();

app.use(json());
app.use(cors());
app.use(morgan("dev"));

app.use(router);

app.get("/checkservice", (_, res) =>
  respHandler({ res, status: 200, data: { status: "ok" } })
);

app.listen(PORT, () =>
  console.log(`Server running at: http://localhost:${PORT}`)
);
