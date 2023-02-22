import {
  AccountCreationFailureEvent,
  Listener,
  Subjects,
} from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { User } from "../../models/user";
import { queueGroupName } from "./queue-group-name";

class AccountCreationFailureListener extends Listener<AccountCreationFailureEvent> {
  subject: Subjects.AuthServiceAccountCreationFailure =
    Subjects.AuthServiceAccountCreationFailure;
  queueGroupName = queueGroupName;

  async onMessage(data: AccountCreationFailureEvent["data"], msg: Message) {
    const { userId } = data;

    const user = await User.findByIdAndDelete(userId);

    console.log(user);

    // ack the message
    msg.ack();
  }
}

export { AccountCreationFailureListener };
