import {
  CreateAllowanceSuccessEvent,
  Listener,
  Subjects,
} from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { Allowance } from "../../models/allowance";
import { queueGroupName } from "./queue-group-name";

class CreateAllowanceSuccessListener extends Listener<CreateAllowanceSuccessEvent> {
  subject: Subjects.AllowanceSrvCreateAllowanceSuccess =
    Subjects.AllowanceSrvCreateAllowanceSuccess;
  queueGroupName = queueGroupName;

  async onMessage(data: CreateAllowanceSuccessEvent["data"], msg: Message) {
    const { allowanceId, description, amount } = data;

    const allowance = Allowance.build({
      allowanceId,
      description,
      amount,
    });
    await allowance.save();

    // ack the message
    msg.ack();
  }
}

export { CreateAllowanceSuccessListener };
