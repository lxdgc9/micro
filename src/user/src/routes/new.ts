import { Request, Response, Router } from "express";
import { UserCreatedPublisher } from "../events/publishers/user-created-publisher";
import { Profile } from "../models/profile";
import { User } from "../models/user";
import { natsWrapper } from "../nats-wrapper";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, password, name } = req.body;

  const profile = Profile.build({ name });
  const user = User.build({ profile: profile.id });
  await profile.save();
  await user.save();

  new UserCreatedPublisher(natsWrapper.client).publish({
    username,
    password,
    userId: user.id as string,
  });

  res.status(201).send(user);
});

export { router as newUserRouter };
