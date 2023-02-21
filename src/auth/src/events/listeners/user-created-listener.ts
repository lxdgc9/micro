import { Listener, Subjects, UserCreatedEvent } from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { Account } from "../../models/account";
import { natsWrapper } from "../../nats-wrapper";
import { AccountCreatedPublisher } from "../publishers/account-created-publisher";
import { queueGroupName } from "./queue-group-name";

class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: UserCreatedEvent["data"], msg: Message) {
    const { username, phone, email, password, userId } = data;

    console.log(data);

    const account = Account.build({
      username,
      password,
      userId,
    });
    await account.save();

    new AccountCreatedPublisher(natsWrapper.client).publish({
      accountId: account.id as string,
      userId: account.userId,
      key: account.username,
    });

    // ack the message
    msg.ack();
  }
}

export { UserCreatedListener };
