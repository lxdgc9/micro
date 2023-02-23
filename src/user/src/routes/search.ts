import { Request, Response, Router } from "express";
import { User } from "../models/user";

const router = Router();

router.get("/search", async (req: Request, res: Response) => {
  const { key } = req.query;

  const users = await User.find({
    $or: [
      {
        "profile.baseInfo.fullName": { $regex: new RegExp(key as string, "i") },
      },
      {
        "profile.baseInfo.phone": key,
      },
    ],
  }).select("-profile.job");

  res.send(users);
});

export { router as searchUsersRouter };
