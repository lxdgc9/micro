import { Request, Response, Router } from "express";
import { UserFilter } from "../models/user-filter";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { key } = req.query;

  const users = await UserFilter.find({
    $or: [
      {
        fullName: { $regex: new RegExp(key as string, "i") },
      },
      {
        phone: key,
      },
    ],
  })
    .select("userId")
    .populate({
      path: "userId",
      select: "profile",
      populate: {
        path: "profile",
      },
    });

  res.send(users);
});

export { router as searchUsersRouter };
