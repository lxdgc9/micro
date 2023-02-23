import {
  Publisher,
  Subjects,
  UpdateRelationshipSuccessEvent,
} from "@gdvn-longdp/common";

class UpdateRelationshipSuccessPublisher extends Publisher<UpdateRelationshipSuccessEvent> {
  subject: Subjects.RelationshipSrvUpdateRelationshipSuccess =
    Subjects.RelationshipSrvUpdateRelationshipSuccess;
}

export { UpdateRelationshipSuccessPublisher };
