import { Request, Response, Router } from "express";
import { UserCreationSuccessPublisher } from "../events/publishers/user-creation-success-publisher";
import { Profile } from "../models/profile";
import { User } from "../models/user";
import { UserFilter } from "../models/user-filter";
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

  new UserCreationSuccessPublisher(natsWrapper.client).publish({
    username,
    password,
    userId: user.id,
  });

  const userFilter = UserFilter.build({
    userId: user.id,
    fullName: profile.baseInfo.fullName,
    phone: profile.baseInfo.phone,
  });
  await userFilter.save();
});

export { router as newUserRouter };
