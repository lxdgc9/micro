import { NextFunction, Request, Response, Router } from "express";
import { Department } from "../../../models/department";
import { Job } from "../../../models/job";

const router = Router();

router.post("/", async (req: Request, res: Response, _next: NextFunction) => {
  const { departmentId, name } = req.body;

  const job = Job.build({
    departmentId,
    name,
  });
  await job.save();

  const department = await Department.findByIdAndUpdate(
    departmentId,
    { $push: { jobs: job.id } },
    { new: true }
  );
  console.log(department);

  res.status(201).send(job);
});

export { router as newJobRouter };
