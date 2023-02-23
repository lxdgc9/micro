import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { CreateUserSuccessPublisher } from "../events/publishers/create-user-success-publisher";
import { User } from "../models/user";
import { natsWrapper } from "../nats-wrapper";

const router = Router();

router.post(
  "/",
  [],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      username,
      password,
      profile: {
        code,
        baseInfo: { fullName, phone, email },
      },
    } = req.body;

    try {
      const user = User.build({
        profile: {
          code,
          baseInfo: {
            fullName,
            phone,
            email,
          },
        },
      });
      await user.save();

      res.status(201).send(user);

      new CreateUserSuccessPublisher(natsWrapper.client).publish({
        userId: user.id,
        username,
        password,
      });
    } catch (err) {
      console.log(err);
      next(new BadRequestError("Create New User Failure"));
    }
  }
);

export { router as newUserRouter };
