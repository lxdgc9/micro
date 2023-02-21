import {
  Listener,
  Subjects,
  UserCreationSuccessEvent,
} from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { Account } from "../../models/account";
import { natsWrapper } from "../../nats-wrapper";
import { AccountCreationFailurePublisher } from "../publishers/account-creation-failure-publisher";
import { queueGroupName } from "./queue-group-name";

class UserCreationSuccessListener extends Listener<UserCreationSuccessEvent> {
  subject: Subjects.UserCreationSuccess = Subjects.UserCreationSuccess;
  queueGroupName = queueGroupName;

  async onMessage(data: UserCreationSuccessEvent["data"], msg: Message) {
    const { username, password, userId } = data;

    const account = Account.build({
      username,
      password,
      userId,
    });

    try {
      await account.save();
    } catch (err) {
      console.log(err);
      new AccountCreationFailurePublisher(natsWrapper.client).publish({
        userId: account.userId,
      });
    }

    // ack the message
    msg.ack();
  }
}

export { UserCreationSuccessListener };
