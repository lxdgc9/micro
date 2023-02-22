import { BadRequestError } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { JobCreationSuccessPublisher } from "../../../events/publishers/job-creation-success-publisher";
import { Department } from "../../../models/department";
import { Job } from "../../../models/job";
import { natsWrapper } from "../../../nats-wrapper";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { departmentId, name } = req.body;

  try {
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
    if (!department) {
      throw new Error("Invalid Department");
    }

    res.status(201).send(job);

    new JobCreationSuccessPublisher(natsWrapper.client).publish({
      jobId: job.id,
      departmentId: department.id,
      name: job.name,
    });
  } catch (err) {
    console.log(err);
    next(new BadRequestError("Create New Job Failure"));
  }
});

export { router as newJobRouter };
