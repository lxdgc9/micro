import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { CreateAllowanceSuccessPublisher } from "../events/publishers/create-allowance-success-publisher";
import { Allowance } from "../models/allowance";
import { natsWrapper } from "../nats-wrapper";

const router = Router();

router.post(
  "/",
  [],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { description, amount } = req.body;

    try {
      const allowance = Allowance.build({
        description,
        amount,
      });
      await allowance.save();

      res.status(201).send(allowance);

      new CreateAllowanceSuccessPublisher(natsWrapper.client).publish({
        allowanceId: allowance.id,
        description: allowance.description,
        amount: allowance.amount,
      });
    } catch (err) {
      console.log(err);
      next(new BadRequestError("Create New Allowance Failure"));
    }
  }
);

export { router as newAllowanceRouter };
