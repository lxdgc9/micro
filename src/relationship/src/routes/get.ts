import { NotFoundError } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { Relationship } from "../models/relationship";

const router = Router();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const relationships = await Relationship.find({});

    res.send(relationships);
  } catch (err) {
    console.log(err);
    next(new NotFoundError("Get Relationships Failure"));
  }
});

export { router as getRelationshipsRouter };
