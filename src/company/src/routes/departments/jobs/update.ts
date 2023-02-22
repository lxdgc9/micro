import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { UpdateJobSuccessPublisher } from "../../../events/publishers/update-job-success-publisher";
import { Department } from "../../../models/department";
import { Job } from "../../../models/job";
import { natsWrapper } from "../../../nats-wrapper";

const router = Router();

router.patch(
  "/departments/jobs/:jobId",
  [],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { jobId } = req.params;
    const { departmentId, name } = req.body;

    try {
      const job = await Job.findByIdAndUpdate(
        jobId,
        {
          $set: {
            departmentId,
            name,
          },
        },
        {
          new: true,
        }
      );
      if (!job) {
        throw new Error("Invalid jobId");
      }

      res.send(job);

      new UpdateJobSuccessPublisher(natsWrapper.client).publish({
        jobId: job.id,
        departmentId: job.departmentId,
        name: job.name,
      });

      // Modify company document if change companyId
      if (departmentId) {
        await Department.findOneAndUpdate(
          { jobs: job.id },
          { $pull: { jobs: job.id } }
        );
        await Department.findByIdAndUpdate(job.departmentId, {
          $push: { jobs: job.id },
        });
      }
    } catch (err) {
      console.log(err);
      next(new BadRequestError("Update Job Failure"));
    }
  }
);

export { router as updateJobRouter };
