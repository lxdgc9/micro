import { Listener, Subjects, UserCreatedEvent } from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";

class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: UserCreatedEvent["data"], msg: Message) {
    console.log(data);

    // ack the message
    msg.ack();
  }
}

export { UserCreatedListener };
