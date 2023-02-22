import { BadRequestError } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { DepartmentCreationSuccessPublisher } from "../../events/publishers/department-creation-success-publisher";
import { Company } from "../../models/company";
import { Department } from "../../models/department";
import { natsWrapper } from "../../nats-wrapper";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { companyId, name } = req.body;

  try {
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
    if (!company) {
      throw new Error("Invalid Company");
    }

    res.status(201).send(department);

    new DepartmentCreationSuccessPublisher(natsWrapper.client).publish({
      departmentId: department.id,
      companyId: company.id,
      name: department.name,
    });
  } catch (err) {
    console.log(err);
    next(new BadRequestError("Create New Department Failure"));
  }
});

export { router as newDepartmentRouter };
