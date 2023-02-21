import { Request, Response, Router } from "express";
import { UserCreatedPublisher } from "../events/publishers/user-created-publisher";
import { Profile } from "../models/profile";
import { User } from "../models/user";
import { natsWrapper } from "../nats-wrapper";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { fullName, username, phone, email, password } = req.body;

  const profile = Profile.build({
    baseInfo: {
      fullName,
      phone,
      email,
    },
  });
  const user = User.build({ profile: profile.id });
  await profile.save();
  await user.save();

  res.status(201).send(user);

  new UserCreatedPublisher(natsWrapper.client).publish({
    username,
    email,
    phone,
    password,
    userId: user.id,
  });
});

export { router as newUserRouter };
