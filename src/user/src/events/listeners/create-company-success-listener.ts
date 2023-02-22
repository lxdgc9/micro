import {
  CreateCompanySuccessEvent,
  Listener,
  Subjects,
} from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { Company } from "../../models/company";
import { queueGroupName } from "./queue-group-name";

class CreateCompanySuccessListener extends Listener<CreateCompanySuccessEvent> {
  subject: Subjects.CompanySrvCreateCompanySuccess =
    Subjects.CompanySrvCreateCompanySuccess;
  queueGroupName = queueGroupName;

  async onMessage(data: CreateCompanySuccessEvent["data"], msg: Message) {
    const { companyId, name, doe, avatar } = data;

    const company = Company.build({
      companyId,
      name,
      doe,
      avatar,
    });
    await company.save();

    // ack the message
    msg.ack();
  }
}

export { CreateCompanySuccessListener };
