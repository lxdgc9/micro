import {
  Listener,
  Subjects,
  UpdateAllowanceSuccessEvent,
} from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { Allowance } from "../../models/allowance";
import { queueGroupName } from "./queue-group-name";

class UpdateAllowanceSuccessListener extends Listener<UpdateAllowanceSuccessEvent> {
  subject: Subjects.AllowanceSrvUpdateAllowanceSuccess =
    Subjects.AllowanceSrvUpdateAllowanceSuccess;
  queueGroupName = queueGroupName;

  async onMessage(data: UpdateAllowanceSuccessEvent["data"], msg: Message) {
    const { allowanceId, description, amount } = data;

    const allowance = await Allowance.findOneAndUpdate(
      { allowanceId },
      {
        $set: {
          description,
          amount,
        },
      },
      { new: true }
    );
    if (!allowance) {
      throw new Error("Invalid allowanceId");
    }

    // ack the message
    msg.ack();
  }
}

export { UpdateAllowanceSuccessListener };
