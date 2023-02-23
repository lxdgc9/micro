import { errorHandler } from "@gdvn-longdp/common";
import express from "express";
import { getAllowancesRouter } from "./routes/get";
import { newAllowanceRouter } from "./routes/new";
import { updateAllowanceRouter } from "./routes/update";

const app = express();

app.use(express.json());

app.use("/api/allowances", getAllowancesRouter);
app.use("/api/allowances", newAllowanceRouter);
app.use("/api/allowances", updateAllowanceRouter);

app.use(errorHandler);

export { app };
