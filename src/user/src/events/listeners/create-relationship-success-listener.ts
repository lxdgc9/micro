import {
  CreateRelationshipSuccessEvent,
  Listener,
  Subjects,
} from "@gdvn-longdp/common";
import { Message } from "node-nats-streaming";
import { Relationship } from "../../models/relationship";
import { queueGroupName } from "./queue-group-name";

class CreateRelationshipSuccessListener extends Listener<CreateRelationshipSuccessEvent> {
  subject: Subjects.RelationshipSrvCreateRelationshipSuccess =
    Subjects.RelationshipSrvCreateRelationshipSuccess;
  queueGroupName = queueGroupName;

  async onMessage(data: CreateRelationshipSuccessEvent["data"], msg: Message) {
    const { relationshipId, type } = data;

    const relationship = Relationship.build({
      relationshipId,
      type,
    });
    await relationship.save();

    // ack the message
    msg.ack();
  }
}

export { CreateRelationshipSuccessListener };
