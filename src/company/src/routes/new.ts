import { NextFunction, Request, Response, Router } from "express";
import { CompanyCreationSuccessPublisher } from "../events/publishers/company-creation-success-publisher";
import { Company } from "../models/company";
import { natsWrapper } from "../nats-wrapper";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { name, doe, avatar } = req.body;

  const company = Company.build({
    name,
    doe,
    avatar,
  });
  await company.save();

  res.status(201).send(company);

  new CompanyCreationSuccessPublisher(natsWrapper.client).publish({
    companyId: company.id,
    name: company.name,
    doe: company.doe,
    avatar: company.avatar,
  });
});

export { router as newCompanyRouter };
