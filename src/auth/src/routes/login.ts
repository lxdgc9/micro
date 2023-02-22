import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { Request, Response, Router } from "express";
import { Password } from "../helpers/password";
import { Account } from "../models/account";

const router = Router();

router.post(
  "/api/login",
  [],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingAccount = await Account.findOne({ username });
    if (!existingAccount) {
      throw new BadRequestError("Thông tin đăng nhập không hợp lệ");
    }

    const passswordMatch = await Password.compare(
      existingAccount.password,
      password
    );
    if (!passswordMatch) {
      throw new BadRequestError("Thông tin đăng nhập không hợp lệ");
    }
  }
);

export { router as loginRouter };
