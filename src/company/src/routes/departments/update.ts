import { BadRequestError, validateRequest } from "@gdvn-longdp/common";
import { NextFunction, Request, Response, Router } from "express";
import { UpdateDepartmentSuccessPublisher } from "../../events/publishers/update-department-success-publisher";
import { Company } from "../../models/company";
import { Department } from "../../models/department";
import { natsWrapper } from "../../nats-wrapper";

const router = Router();

router.patch(
  "/departments/:departmentId",
  [],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { departmentId } = req.params;
    const { companyId, name } = req.body;

    try {
      const department = await Department.findByIdAndUpdate(
        departmentId,
        {
          $set: {
            companyId,
            name,
          },
        },
        {
          new: true,
        }
      ).populate("jobs");
      if (!department) {
        throw new Error("Invalid departmentId");
      }

      res.send(department);

      new UpdateDepartmentSuccessPublisher(natsWrapper.client).publish({
        departmentId: department.id,
        companyId: department.companyId,
        name: department.name,
      });

      // Modify company document if change companyId
      if (companyId) {
        await Company.findOneAndUpdate(
          { departments: department.id },
          { $pull: { departments: department.id } }
        );
        await Company.findByIdAndUpdate(department.companyId, {
          $push: { departments: department.id },
        });
      }
    } catch (err) {
      console.log(err);
      next(new BadRequestError("Update Department Failure"));
    }
  }
);

export { router as updateDepartmentRouter };
