import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

function currentUser(req: Request, _res: Response, next: NextFunction) {
  const token = req.headers["authorization"]?.split("Bearer ")[1];
  if (!token) {
    return next();
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    console.log(err);
  }

  next();
}

export { currentUser };
