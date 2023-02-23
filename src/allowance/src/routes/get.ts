import { NotFoundError } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { Allowance } from "../models/allowance";

const router = Router();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const allowances = await Allowance.find({});

    res.send(allowances);
  } catch (err) {
    console.log(err);
    next(new NotFoundError("Get Allowances Failure"));
  }
});

export { router as getAllowancesRouter };
