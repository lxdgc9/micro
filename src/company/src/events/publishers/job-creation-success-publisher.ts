import {
  JobCreationSuccessEvent,
  Publisher,
  Subjects,
} from "@gdvn-longdp/common";

class JobCreationSuccessPublisher extends Publisher<JobCreationSuccessEvent> {
  subject: Subjects.CompanyServiceJobCreationSuccess =
    Subjects.CompanyServiceJobCreationSuccess;
}

export { JobCreationSuccessPublisher };
