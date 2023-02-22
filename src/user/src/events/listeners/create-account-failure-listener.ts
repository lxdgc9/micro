import {
  CreateAccountFailureEvent,
  Listener,
  Subjects,
} from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { User } from "../../models/user";
import { queueGroupName } from "./queue-group-name";

class CreateAccountFailureListener extends Listener<CreateAccountFailureEvent> {
  subject: Subjects.AuthSrvCreateAccountFailure =
    Subjects.AuthSrvCreateAccountFailure;
  queueGroupName = queueGroupName;

  async onMessage(data: CreateAccountFailureEvent["data"], msg: Message) {
    const { userId } = data;

    const user = await User.findByIdAndDelete(userId);

    console.log(user);

    // ack the message
    msg.ack();
  }
}

export { CreateAccountFailureListener };
