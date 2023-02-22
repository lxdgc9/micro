import { NotFoundError } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { User } from "../../models/user";

const router = Router();

router.get(
  "/:userId/profiles",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId)
        .lean()
        .select("-_id profile")
        .populate({
          path: "profile",
          populate: {
            path: "job",
            select: "-_id -jobId",
            populate: {
              path: "department",
              select: "-_id -departmentId",
              populate: {
                path: "company",
                select: "-_id -companyId",
              },
            },
          },
        });

      res.send(user);
    } catch (err) {
      console.log(err);
      next(new NotFoundError("Get Profile Failure"));
    }
  }
);

export { router as getProfileRouter };
