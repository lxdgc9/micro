import {
  Listener,
  Subjects,
  UpdateRelationshipSuccessEvent,
} from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { Relationship } from "../../models/relationship";
import { queueGroupName } from "./queue-group-name";

class UpdateRelationshipSuccessListener extends Listener<UpdateRelationshipSuccessEvent> {
  subject: Subjects.RelationshipSrvUpdateRelationshipSuccess =
    Subjects.RelationshipSrvUpdateRelationshipSuccess;
  queueGroupName = queueGroupName;

  async onMessage(data: UpdateRelationshipSuccessEvent["data"], msg: Message) {
    const { relationshipId, type } = data;

    const relationship = await Relationship.findOneAndUpdate(
      { relationshipId },
      {
        $set: {
          type,
        },
      },
      { new: true }
    );
    if (!relationship) {
      throw new Error("Invalid relationshipId");
    }

    // ack the message
    msg.ack();
  }
}

export { UpdateRelationshipSuccessListener };
