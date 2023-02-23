import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { UpdateRelationshipSuccessPublisher } from "../events/publishers/update-relationship-success-publisher";
import { Relationship } from "../models/relationship";
import { natsWrapper } from "../nats-wrapper";

const router = Router();

router.patch(
  "/:relationshipId",
  [],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { relationshipId } = req.params;
    const { type } = req.body;

    try {
      const relationship = await Relationship.findByIdAndUpdate(
        relationshipId,
        {
          $set: {
            type,
          },
        },
        {
          new: true,
        }
      );
      if (!relationship) {
        throw new Error("Invalid relationshipId");
      }

      res.send(relationship);

      new UpdateRelationshipSuccessPublisher(natsWrapper.client).publish({
        relationshipId: relationship.id,
        type: relationship.type,
      });
    } catch (err) {
      console.log(err);
      next(new BadRequestError("Update Relationship Failure"));
    }
  }
);

export { router as updateRelationshipRouter };
