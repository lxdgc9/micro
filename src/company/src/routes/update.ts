import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { Company } from "../models/company";

const router = Router();

router.patch(
  "/:companyId",
  [],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { companyId } = req.params;
    const { name, doe, avatar } = req.body;

    try {
      const company = await Company.findByIdAndUpdate(
        companyId,
        {
          $set: { name, doe, avatar },
        },
        {
          new: true,
        }
      );
      if (!company) {
        throw new Error("Invalid companyId");
      }

      res.send(company);
    } catch (err) {
      console.log(err);
      next(new BadRequestError("Update Company Failure"));
    }
  }
);

export { router as updateCompanyRouter };
