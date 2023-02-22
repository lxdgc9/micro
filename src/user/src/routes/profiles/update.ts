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
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("Invalid UserId");
      }

      const job = await Job.findOne({ jobId });
      if (!job) {
        throw new Error("Invalid JobId");
      }

      user.profile.job = job.id;

      await user.save();

      if (user.isModified("profile.job")) {
      }

      res.send(user);
    } catch (err) {
      console.log(err);
      next(new BadRequestError("Update User Failure"));
    }
  }
);

export { router as updateUserRouter };
