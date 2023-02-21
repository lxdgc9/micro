import { Request, Response, Router } from "express";
import { Company } from "../models/company";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const company = await Company.find({}).populate({
    path: "departments",
    select: "-companyId",
    populate: {
      path: "jobs",
    },
  });

  res.send(company);
});

export { router as getCompanyRouter };
