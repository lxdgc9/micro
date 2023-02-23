import { errorHandler } from "@gdvn-longdp/common";
import express from "express";
import { getUsersRouter } from "./routes/get";
import { newUserRouter } from "./routes/new";
import { getProfileRouter } from "./routes/profiles/get";
import { deleteRelativeRouter } from "./routes/profiles/relatives/delete";
import { newRelativeRouter } from "./routes/profiles/relatives/new";
import { updateRelativeRouter } from "./routes/profiles/relatives/update";
import { updateUserRouter } from "./routes/profiles/update";
import { searchUsersRouter } from "./routes/search";

const app = express();

app.use(express.json());

app.use("/api/users", getUsersRouter);
app.use("/api/users", newUserRouter);
app.use("/api/users", searchUsersRouter);
app.use("/api/users", getProfileRouter);
app.use("/api/users", updateUserRouter);
app.use("/api/users", newRelativeRouter);
app.use("/api/users", updateRelativeRouter);
app.use("/api/users", deleteRelativeRouter);

app.use(errorHandler);

export { app };
