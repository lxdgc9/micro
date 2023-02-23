import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { Allowance } from "../../models/allowance";
import { Job } from "../../models/job";
import { User } from "../../models/user";

const router = Router();

router.patch(
  "/:userId/profiles",
  [],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const {
      code,
      profile: {
        fullName,
        dob,
        gender,
        phone,
        email,
        idCard: { no = undefined, doi = undefined, poi = undefined } = {},
      },
      jobId,
      office,
      address,
      income: { salary = undefined, allowanceIds = [] } = {},
    } = req.body;

    try {
      const job = jobId ? await Job.findOne({ jobId }) : undefined;

      const allowances = allowanceIds
        ? await Allowance.find({ allowanceId: allowanceIds })
        : undefined;

      console.log(allowances?.map((el) => el.id));

      const user = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            "profile.code": code,
            "profile.baseInfo.fullName": fullName,
            "profile.baseInfo.dob": dob,
            "profile.baseInfo.gender": gender,
            "profile.baseInfo.phone": phone,
            "profile.baseInfo.email": email,
            "profile.baseInfo.idCard.no": no,
            "profile.baseInfo.idCard.doi": doi,
            "profile.baseInfo.idCard.poi": poi,
            "profile.job": job?.id,
            "profile.office": office,
            "profile.address": address,
            "profile.income.salary": salary,
            "profile.income.allowances": allowances?.map(
              (allowance) => allowance.id
            ),
          },
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .select("-_id profile")
        .populate({
          path: "profile",
          populate: [
            {
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
            {
              path: "income.allowances",
              select: "-allowanceId",
            },
          ],
        });
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
