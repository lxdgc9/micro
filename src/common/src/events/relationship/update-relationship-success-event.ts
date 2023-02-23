import { Subjects } from "../subjects";

interface UpdateRelationshipSuccessEvent {
  subject: Subjects.RelationshipSrvUpdateRelationshipSuccess;
  data: {
    relationshipId: string;
    type: string;
  };
}

export { UpdateRelationshipSuccessEvent };
