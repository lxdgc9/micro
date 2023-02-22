import { errorHandler } from "@gdvn-longdp/common";
import express from "express";
import { getDepartmentsRouter } from "./routes/departments/get";
import { getJobsRouter } from "./routes/departments/jobs/get";
import { newJobRouter } from "./routes/departments/jobs/new";
import { updateJobRouter } from "./routes/departments/jobs/update";
import { newDepartmentRouter } from "./routes/departments/new";
import { updateDepartmentRouter } from "./routes/departments/update";
import { getCompaniesRouter } from "./routes/get";
import { newCompanyRouter } from "./routes/new";
import { updateCompanyRouter } from "./routes/update";

const app = express();

app.use(express.json());

app.use("/api/companies", getCompaniesRouter);
app.use("/api/companies", newCompanyRouter);
app.use("/api/companies", updateCompanyRouter);

app.use("/api/companies", getDepartmentsRouter);
app.use("/api/companies", newDepartmentRouter);
app.use("/api/companies", updateDepartmentRouter);

app.use("/api/companies", getJobsRouter);
app.use("/api/companies", newJobRouter);
app.use("/api/companies", updateJobRouter);

app.use(errorHandler);

export { app };
