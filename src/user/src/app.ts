import { errorHandler } from "@gdvn-longdp/common";
import express from "express";
import { getUsersRouter } from "./routes/get";
import { newUserRouter } from "./routes/new";
import { searchUsersRouter } from "./routes/search";

const app = express();

app.use(express.json());

app.use("/api/users", getUsersRouter);
app.use("/api/users", newUserRouter);
app.use("/api/users/filter", searchUsersRouter);

app.use(errorHandler);

export { app };
