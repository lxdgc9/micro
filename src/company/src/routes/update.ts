import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { UpdateCompanySuccessPublisher } from "../events/publishers/update-company-success-publisher";
import { Company } from "../models/company";
import { natsWrapper } from "../nats-wrapper";

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
          $set: {
            name,
            doe,
            avatar,
          },
        },
        {
          new: true,
        }
      ).populate("departments");
      if (!company) {
        throw new Error("Invalid companyId");
      }

      res.send(company);

      new UpdateCompanySuccessPublisher(natsWrapper.client).publish({
        companyId: company.id,
        name: company.name,
        doe: company.doe,
        avatar: company.avatar,
      });
    } catch (err) {
      console.log(err);
      next(new BadRequestError("Update Company Failure"));
    }
  }
);

export { router as updateCompanyRouter };
