import { NotFoundError } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { Department } from "../../models/department";

const router = Router();

router.get(
  "/departments",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const departments = await Department.find({}).populate({
        path: "jobs",
        select: "-departmentId",
      });

      res.send(departments);
    } catch (err) {
      console.log(err);
      next(new NotFoundError("Get Department Failure"));
    }
  }
);

export { router as getDepartmentsRouter };
