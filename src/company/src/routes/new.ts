import { NextFunction, Request, Response, Router } from "express";
import { Company } from "../models/company";

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
});

export { router as newCompanyRouter };
