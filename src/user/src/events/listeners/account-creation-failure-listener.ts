import {
  AccountCreationFailureEvent,
  Listener,
  Subjects,
} from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { Profile } from "../../models/profile";
import { User } from "../../models/user";
import { UserFilter } from "../../models/user-filter";
import { queueGroupName } from "./queue-group-name";

class AccountCreationFailureListener extends Listener<AccountCreationFailureEvent> {
  subject: Subjects.AuthServiceAccountCreationFailure =
    Subjects.AuthServiceAccountCreationFailure;
  queueGroupName = queueGroupName;

  async onMessage(data: AccountCreationFailureEvent["data"], msg: Message) {
    const { userId } = data;

    const user = await User.findById(userId);
    if (user) {
      await Profile.findByIdAndDelete(user.profile);
      await UserFilter.findOneAndDelete({ userId: user.id });
      await user.delete();
    }

    // ack the message
    msg.ack();
  }
}

export { AccountCreationFailureListener };
