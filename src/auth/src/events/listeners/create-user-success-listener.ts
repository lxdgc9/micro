import {
  CreateUserSuccessEvent,
  Listener,
  Subjects,
} from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { Account } from "../../models/account";
import { natsWrapper } from "../../nats-wrapper";
import { CreateAccountFailurePublisher } from "../publishers/create-account-failure-publisher";
import { queueGroupName } from "./queue-group-name";

class CreateUserSuccessListener extends Listener<CreateUserSuccessEvent> {
  subject: Subjects.UserSrvCreateUserSuccess =
    Subjects.UserSrvCreateUserSuccess;
  queueGroupName = queueGroupName;

  async onMessage(data: CreateUserSuccessEvent["data"], msg: Message) {
    const { userId, username, password } = data;

    const account = Account.build({
      userId,
      username,
      password,
    });

    try {
      await account.save();
    } catch (err) {
      console.log(err);
      new CreateAccountFailurePublisher(natsWrapper.client).publish({
        userId: account.userId,
      });
    }

    // ack the message
    msg.ack();
  }
}

export { CreateUserSuccessListener };
