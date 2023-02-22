import {
  Publisher,
  Subjects,
  UpdateJobSuccessEvent,
} from "@gdvn-longdp/common";

class UpdateJobSuccessPublisher extends Publisher<UpdateJobSuccessEvent> {
  subject: Subjects.CompanySrvUpdateJobSuccess =
    Subjects.CompanySrvUpdateJobSuccess;
}

export { UpdateJobSuccessPublisher };
