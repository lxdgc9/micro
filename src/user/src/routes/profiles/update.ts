import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { Job } from "../../models/job";
import { User } from "../../models/user";

const router = Router();

router.patch(
  "/:userId/profiles",
  [],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { jobId } = req.body;

    try {
      const job = await Job.findOne({ jobId });
      if (!job) {
        throw new Error("Invalid JobId");
      }

      const user = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            "profile.job": job.id,
          },
        },
        { new: true }
      );
      if (!user) {
        throw new Error("Invalid UserId");
      }

      res.send(user);
    } catch (err) {
      console.log(err);
      next(new BadRequestError("Update User Failure"));
    }
  }
);

export { router as updateUserRouter };
