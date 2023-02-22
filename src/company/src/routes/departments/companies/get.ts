import { Request, Response, Router } from "express";
import { Job } from "../../../models/job";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const jobs = await Job.find({}).select("-departmentId");

  res.send(jobs);
});

export { router as getJobsRouter };
