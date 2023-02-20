import { AccountCreatedEvent, Listener, Subjects } from "@gdvn-longdp/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { User } from "../../models/user";
import { UserByKey } from "../../models/user-by-key";
import { queueGroupName } from "./queue-group-name";

class AccountCreatedListener extends Listener<AccountCreatedEvent> {
  subject: Subjects.AccountCreated = Subjects.AccountCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: AccountCreatedEvent["data"], msg: Message) {
    const { userId, key } = data;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const userByKey = UserByKey.build({
      userId: new mongoose.Types.ObjectId(userId),
      key,
    });
    await userByKey.save();

    // ack the message
    msg.ack();
  }
}

export { AccountCreatedListener };
