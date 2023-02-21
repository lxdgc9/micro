import { BadRequestError } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { UserCreationSuccessPublisher } from "../events/publishers/user-creation-success-publisher";
import { Profile } from "../models/profile";
import { User } from "../models/user";
import { UserFilter } from "../models/user-filter";
import { natsWrapper } from "../nats-wrapper";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { fullName, username, phone, email, password } = req.body;

  try {
    const profile = Profile.build({
      baseInfo: {
        fullName,
        phone,
        email,
      },
    });
    await profile.save();

    const user = User.build({ profile: profile.id });
    await user.save();

    const userFilter = UserFilter.build({
      userId: user.id,
      fullName: profile.baseInfo.fullName,
      phone: profile.baseInfo.phone,
    });
    await userFilter.save();

    res.status(201).send(user);

    new UserCreationSuccessPublisher(natsWrapper.client).publish({
      username,
      password,
      userId: user.id,
    });
  } catch (err) {
    console.log(err);
    next(new BadRequestError("Create New User Failure"));
  }
});

export { router as newUserRouter };
