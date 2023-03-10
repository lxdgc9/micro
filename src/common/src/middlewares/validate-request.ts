import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

function validateRequest(req: Request, res: Response, next: NextFunction) {
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    throw new RequestValidationError(errs.array()[0].msg);
  }

  next();
}

export { validateRequest };
