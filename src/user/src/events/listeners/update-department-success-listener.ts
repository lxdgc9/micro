import {
  Listener,
  Subjects,
  UpdateDepartmentSuccessEvent,
} from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { Company } from "../../models/company";
import { Department } from "../../models/department";
import { queueGroupName } from "./queue-group-name";

class UpdateDepartmentSuccessListener extends Listener<UpdateDepartmentSuccessEvent> {
  subject: Subjects.CompanySrvUpdateDepartmentSuccess =
    Subjects.CompanySrvUpdateDepartmentSuccess;
  queueGroupName = queueGroupName;

  async onMessage(data: UpdateDepartmentSuccessEvent["data"], msg: Message) {
    const { departmentId, companyId, name } = data;

    const company = await Company.findOne({ companyId });
    if (!company) {
      throw new Error();
    }

    const department = await Department.findOneAndUpdate(
      { departmentId },
      {
        $set: {
          name,
          company: company.id,
        },
      },
      { new: true }
    );
    if (!department) {
      throw new Error("Invalid companyId");
    }

    // ack the message
    msg.ack();
  }
}

export { UpdateDepartmentSuccessListener };
