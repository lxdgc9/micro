import {
  CreateJobSuccessEvent,
  Publisher,
  Subjects,
} from "@gdvn-longdp/common";

class CreateJobSuccessPublisher extends Publisher<CreateJobSuccessEvent> {
  subject: Subjects.CompanySrvCreateJobSuccess =
    Subjects.CompanySrvCreateJobSuccess;
}

export { CreateJobSuccessPublisher };
