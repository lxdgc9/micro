import { errorHandler } from "@gdvn-longdp/common";
import express from "express";
import { newUserRouter } from "./routes/new";

const app = express();

app.use(express.json());

app.use(newUserRouter);

app.use(errorHandler);

export { app };
