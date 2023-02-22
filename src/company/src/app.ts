import { errorHandler } from "@gdvn-longdp/common";
import express from "express";
import { getJobsRouter } from "./routes/departments/companies/get";
import { newJobRouter } from "./routes/departments/companies/new";
import { getDepartmentsRouter } from "./routes/departments/get";
import { getCompaniesRouter } from "./routes/get";
import { newCompanyRouter } from "./routes/new";
const app = express();

app.use(express.json());

app.use("/api/companies", getCompaniesRouter);
app.use("/api/companies", newCompanyRouter);

app.use("/api/companies/departments", getDepartmentsRouter);
app.use("/api/companies/departments", getDepartmentsRouter);

app.use("/api/companies/departments/jobs", getJobsRouter);
app.use("/api/companies/departments/jobs", newJobRouter);

app.use(errorHandler);

export { app };
