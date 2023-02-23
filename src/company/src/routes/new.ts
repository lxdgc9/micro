import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { CreateCompanySuccessPublisher } from "../events/publishers/create-company-success-publisher";
import { Company } from "../models/company";
import { natsWrapper } from "../nats-wrapper";

const router = Router();

router.post(
  "/",
  [],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, sign, doe, avatar } = req.body;

    try {
      const company = Company.build({
        name,
        sign,
        doe,
        avatar,
      });
      await company.save();

      res.status(201).send(company);

      new CreateCompanySuccessPublisher(natsWrapper.client).publish({
        companyId: company.id,
        name: company.name,
        doe: company.doe,
        avatar: company.avatar,
      });
    } catch (err) {
      console.log(err);
      next(new BadRequestError("Create New Company Failure"));
    }
  }
);

export { router as newCompanyRouter };
