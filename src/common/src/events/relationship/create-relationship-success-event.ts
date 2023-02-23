import { Subjects } from "../subjects";

interface CreateRelationshipSuccessEvent {
  subject: Subjects.RelationshipSrvCreateRelationshipSuccess;
  data: {
    relationshipId: string;
    type: string;
  };
}

export { CreateRelationshipSuccessEvent };
