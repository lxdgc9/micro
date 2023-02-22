import { errorHandler } from "@gdvn-longdp/common";
import express from "express";
import { getUsersRouter } from "./routes/get";
import { newUserRouter } from "./routes/new";
import { getProfileRouter } from "./routes/profiles/get";
import { updateUserRouter } from "./routes/profiles/update";
import { searchUsersRouter } from "./routes/search";

const app = express();

app.use(express.json());

app.use("/api/users", getUsersRouter);
app.use("/api/users", newUserRouter);
app.use("/api/users", searchUsersRouter);
app.use("/api/users", getProfileRouter);
app.use("/api/users", updateUserRouter);

app.use(errorHandler);

export { app };
