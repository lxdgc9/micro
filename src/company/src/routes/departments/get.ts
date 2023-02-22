import { Request, Response, Router } from "express";
import { Department } from "../../models/department";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const departments = await Department.find({}).populate("jobs");

  res.send(departments);
});

export { router as getDepartmentsRouter };
