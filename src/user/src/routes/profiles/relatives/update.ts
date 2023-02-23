import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { Relationship } from "../../../models/relationship";
import { Relative } from "../../../models/relative";

const router = Router();

router.patch(
  "/:userId/profiles/relatives/:relativeId",
  [],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, relativeId } = req.params;
    const { fullName, dob, gender, phone, relationshipId } = req.body;

    try {
      const relationship = relationshipId
        ? await Relationship.findOne({ relationshipId })
        : undefined;

      const relative = await Relative.findOneAndUpdate(
        {
          _id: relativeId,
          userId,
        },
        {
          $set: {
            fullName,
            dob,
            gender,
            phone,
            relationship: relationship?.id,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .select("-userId")
        .populate("relationship");
      if (!relative) {
        throw new Error("Invalid userId, relativeId");
      }

      res.send(relative);
    } catch (err) {
      console.log(err);
      next(new BadRequestError("Update Relative Failure"));
    }
  }
);

export { router as updateRelativeRouter };
