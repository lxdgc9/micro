import { NextFunction, Request, Response, Router } from "express";
import { Company } from "../../models/company";
import { Department } from "../../models/department";

const router = Router();

router.post("/", async (req: Request, res: Response, _next: NextFunction) => {
  const { companyId, name } = req.body;

  const department = Department.build({
    companyId,
    name,
  });
  await department.save();

  const company = await Company.findByIdAndUpdate(
    companyId,
    { $push: { departments: department.id } },
    { new: true }
  );
  console.log(company);

  res.status(201).send(department);
});

export { router as newDepartmentRouter };
