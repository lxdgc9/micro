import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { CreateRelationshipSuccessPublisher } from "../events/publishers/create-relationship-success-publisher";
import { Relationship } from "../models/relationship";
import { natsWrapper } from "../nats-wrapper";

const router = Router();

router.post(
  "/",
  [],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.body;

    try {
      const relationship = Relationship.build({
        type,
      });
      await relationship.save();

      res.status(201).send(relationship);

      new CreateRelationshipSuccessPublisher(natsWrapper.client).publish({
        relationshipId: relationship.id,
        type: relationship.type,
      });
    } catch (err) {
      console.log(err);
      next(new BadRequestError("Create New Relationship Failure"));
    }
  }
);

export { router as newRelationshipRouter };
