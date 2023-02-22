import { NotFoundError } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { Job } from "../../../models/job";

const router = Router();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = await Job.find({}).select("-departmentId");

    res.send(jobs);
  } catch (err) {
    console.log(err);
    next(new NotFoundError("Get Jobs Failure"));
  }
});

export { router as getJobsRouter };
