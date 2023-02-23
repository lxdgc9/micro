import { errorHandler } from "@gdvn-longdp/common";
import express from "express";
import { getRelationshipsRouter } from "./routes/get";
import { newRelationshipRouter } from "./routes/new";
import { updateRelationshipRouter } from "./routes/update";

const app = express();

app.use(express.json());

app.use("/api/relationships", getRelationshipsRouter);
app.use("/api/relationships", newRelationshipRouter);
app.use("/api/relationships", updateRelationshipRouter);

app.use(errorHandler);

export { app };
