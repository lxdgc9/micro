import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { UpdateAllowanceSuccessPublisher } from "../events/publishers/update-allowance-success-publisher";
import { Allowance } from "../models/allowance";
import { natsWrapper } from "../nats-wrapper";

const router = Router();

router.patch(
  "/:allowanceId",
  [],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { allowanceId } = req.params;
    const { description, amount } = req.body;

    try {
      const allowance = await Allowance.findByIdAndUpdate(
        allowanceId,
        {
          $set: {
            description,
            amount,
          },
        },
        {
          new: true,
        }
      );
      if (!allowance) {
        throw new Error("Invalid allowanceId");
      }

      res.send(allowance);

      new UpdateAllowanceSuccessPublisher(natsWrapper.client).publish({
        allowanceId: allowance.id,
        description: allowance.description,
        amount: allowance.amount,
      });
    } catch (err) {
      console.log(err);
      next(new BadRequestError("Update Allowance Failure"));
    }
  }
);

export { router as updateAllowanceRouter };
