import {
  DepartmentCreationSuccessEvent,
  Listener,
  Subjects,
} from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { Company } from "../../models/company";
import { Department } from "../../models/department";
import { queueGroupName } from "./queue-group-name";

class DepartmentCreationSuccessListener extends Listener<DepartmentCreationSuccessEvent> {
  subject: Subjects.CompanyServiceDepartmentCreationSuccess =
    Subjects.CompanyServiceDepartmentCreationSuccess;
  queueGroupName = queueGroupName;

  async onMessage(data: DepartmentCreationSuccessEvent["data"], msg: Message) {
    const { departmentId, companyId, name } = data;

    // Find company
    const company = await Company.findOne({ companyId });
    if (!company) {
      throw new Error("Invalid Company Id");
    }

    const department = Department.build({
      departmentId,
      name,
      company: company.id,
    });
    await department.save();

    // ack the message
    msg.ack();
  }
}

export { DepartmentCreationSuccessListener };
