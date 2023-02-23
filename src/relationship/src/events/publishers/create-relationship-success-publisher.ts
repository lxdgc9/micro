import {
  CreateRelationshipSuccessEvent,
  Publisher,
  Subjects,
} from "@gdvn-longdp/common";

class CreateRelationshipSuccessPublisher extends Publisher<CreateRelationshipSuccessEvent> {
  subject: Subjects.RelationshipSrvCreateRelationshipSuccess =
    Subjects.RelationshipSrvCreateRelationshipSuccess;
}

export { CreateRelationshipSuccessPublisher };
