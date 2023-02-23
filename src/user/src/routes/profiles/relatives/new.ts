import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { Relationship } from "../../../models/relationship";
import { Relative } from "../../../models/relative";
import { User } from "../../../models/user";

const router = Router();

router.post(
  "/:userId/profiles/relatives",
  [],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { fullName, dob, gender, phone, relationshipId } = req.body;

    try {
      const relationship = relationshipId
        ? await Relationship.findOne({ relationshipId })
        : undefined;

      const relative = Relative.build({
        userId,
        fullName,
        dob,
        gender,
        phone,
        relationship: relationship?.id,
      });
      await relative.save();

      res.status(201).send(relative);

      await User.findByIdAndUpdate(relative.userId, {
        $push: { "profile.relatives": relative.id },
      });
    } catch (err) {
      console.log(err);
      next(new BadRequestError("Create New Relative Failure"));
    }
  }
);

export { router as newRelativeRouter };
