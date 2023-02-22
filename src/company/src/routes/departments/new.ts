import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { CreateDepartmentSuccessPublisher } from "../../events/publishers/create-department-success-publisher";
import { Company } from "../../models/company";
import { Department } from "../../models/department";
import { natsWrapper } from "../../nats-wrapper";

const router = Router();

router.post(
  "/departments",
  [],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
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

      new CreateDepartmentSuccessPublisher(natsWrapper.client).publish({
        departmentId: department.id,
        companyId: company.id,
        name: department.name,
      });
    } catch (err) {
      console.log(err);
      next(new BadRequestError("Create New Department Failure"));
    }
  }
);

export { router as newDepartmentRouter };
