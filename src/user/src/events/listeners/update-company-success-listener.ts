import {
  Listener,
  Subjects,
  UpdateCompanySuccessEvent,
} from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { Company } from "../../models/company";
import { queueGroupName } from "./queue-group-name";

class UpdateCompanySuccessListener extends Listener<UpdateCompanySuccessEvent> {
  subject: Subjects.CompanySrvUpdateCompanySuccess =
    Subjects.CompanySrvUpdateCompanySuccess;
  queueGroupName = queueGroupName;

  async onMessage(data: UpdateCompanySuccessEvent["data"], msg: Message) {
    const { companyId, name, doe, avatar } = data;

    const company = await Company.findOneAndUpdate(
      { companyId },
      {
        $set: {
          name,
          doe,
          avatar,
        },
      },
      { new: true }
    );
    if (!company) {
      throw new Error("Invalid companyId");
    }

    // ack the message
    msg.ack();
  }
}

export { UpdateCompanySuccessListener };
