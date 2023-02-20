import { Listener, Subjects, UserCreatedEvent } from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { Account } from "../../models/account";
import { queueGroupName } from "./queue-group-name";

class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: UserCreatedEvent["data"], msg: Message) {
    const { username, password, userId } = data;

    const account = Account.build({
      username,
      password,
      userId,
    });
    await account.save();

    // ack the message
    msg.ack();
  }
}

export { UserCreatedListener };
