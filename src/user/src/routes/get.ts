import { Request, Response, Router } from "express";
import { User } from "../models/user";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const users = await User.find({}).select("profile.baseInfo");

  res.send(users);
});

export { router as getUsersRouter };
