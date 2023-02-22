import { NotFoundError } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { Company } from "../models/company";

const router = Router();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const companies = await Company.find({}).populate({
      path: "departments",
      select: "-companyId",
      populate: {
        path: "jobs",
        select: "-departmentId",
      },
    });

    res.send(companies);
  } catch (err) {
    console.log(err);
    next(new NotFoundError("Get Company Failure"));
  }
});

export { router as getCompaniesRouter };
