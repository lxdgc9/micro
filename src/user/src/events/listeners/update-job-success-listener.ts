import { Listener, Subjects, UpdateJobSuccessEvent } from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { Department } from "../../models/department";
import { Job } from "../../models/job";
import { queueGroupName } from "./queue-group-name";

class UpdateJobSuccessListener extends Listener<UpdateJobSuccessEvent> {
  subject: Subjects.CompanySrvUpdateJobSuccess =
    Subjects.CompanySrvUpdateJobSuccess;
  queueGroupName = queueGroupName;

  async onMessage(data: UpdateJobSuccessEvent["data"], msg: Message) {
    const { jobId, departmentId, name } = data;

    const department = await Department.findOne({ departmentId });
    if (!department) {
      throw new Error();
    }

    const job = await Job.findOneAndUpdate(
      { jobId },
      {
        $set: {
          name,
          department: department.id,
        },
      },
      { new: true }
    );
    if (!job) {
      throw new Error("Invalid jobId");
    }

    // ack the message
    msg.ack();
  }
}

export { UpdateJobSuccessListener };
