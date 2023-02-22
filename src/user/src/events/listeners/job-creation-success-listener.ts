import {
  JobCreationSuccessEvent,
  Listener,
  Subjects,
} from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { Department } from "../../models/department";
import { Job } from "../../models/job";
import { queueGroupName } from "./queue-group-name";

class JobCreationSuccessListener extends Listener<JobCreationSuccessEvent> {
  subject: Subjects.CompanyServiceJobCreationSuccess =
    Subjects.CompanyServiceJobCreationSuccess;
  queueGroupName = queueGroupName;

  async onMessage(data: JobCreationSuccessEvent["data"], msg: Message) {
    const { jobId, departmentId, name } = data;

    // Find department
    const department = await Department.findOne({ departmentId });
    if (!department) {
      throw new Error("Invalid Department Id");
    }

    const job = Job.build({
      jobId,
      name,
      department: department.id,
    });
    await job.save();

    // ack the message
    msg.ack();
  }
}

export { JobCreationSuccessListener };
