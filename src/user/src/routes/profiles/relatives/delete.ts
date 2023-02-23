import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { Relative } from "../../../models/relative";
import { User } from "../../../models/user";

const router = Router();

router.delete(
  "/:userId/profiles/relatives/:relativeId",
  [],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, relativeId } = req.params;

    try {
      const relative = await Relative.findOneAndDelete({
        _id: relativeId,
        userId,
      });
      if (!relative) {
        throw new Error("Invalid userId, relativeId");
      }

      res.send(relative);

      await User.findByIdAndUpdate(relative.userId, {
        $pull: { "profile.relatives": relative.id },
      });
    } catch (err) {
      console.log(err);
      next(new BadRequestError("Delete Relative Failure"));
    }
  }
);

export { router as deleteRelativeRouter };
