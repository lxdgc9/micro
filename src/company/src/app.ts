import { errorHandler } from "@gdvn-longdp/common";
import express from "express";
import { newDepartmentRouter } from "./routes/departments/new";
import { getCompanyRouter } from "./routes/get";
import { newCompanyRouter } from "./routes/new";
const app = express();

app.use(express.json());

app.use("/api/companies", getCompanyRouter);
app.use("/api/companies", newCompanyRouter);

app.use("/api/companies/departments", newDepartmentRouter);

app.use(errorHandler);

export { app };
