import {
  CreateCompanySuccessEvent,
  Publisher,
  Subjects,
} from "@gdvn-longdp/common";

class CreateCompanySuccessPublisher extends Publisher<CreateCompanySuccessEvent> {
  subject: Subjects.CompanySrvCreateCompanySuccess =
    Subjects.CompanySrvCreateCompanySuccess;
}

export { CreateCompanySuccessPublisher };
