import { Request, Response, Router } from "express";
import { Company } from "../models/company";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const companies = await Company.find({}).populate({
    path: "departments",
    select: "-companyId",
    populate: {
      path: "jobs",
      select: "-departmentId",
    },
  });

  res.send(companies);
});

export { router as getCompaniesRouter };
