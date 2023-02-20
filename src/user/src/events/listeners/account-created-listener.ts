import { AccountCreatedEvent, Listener, Subjects } from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { User } from "../../models/user";
import { queueGroupName } from "./queue-group-name";

class AccountCreatedListener extends Listener<AccountCreatedEvent> {
  subject: Subjects.AccountCreated = Subjects.AccountCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: AccountCreatedEvent["data"], msg: Message) {
    const user = await User.findById(data.userId);

    // If no user, throw error
    if (!user) {
      throw new Error("User not found");
    }

    console.log(data);

    // ack the message
    msg.ack();
  }
}

export { AccountCreatedListener };
