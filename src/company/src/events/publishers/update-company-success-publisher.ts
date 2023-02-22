import {
  Publisher,
  Subjects,
  UpdateCompanySuccessEvent,
} from "@gdvn-longdp/common";

class UpdateCompanySuccessPublisher extends Publisher<UpdateCompanySuccessEvent> {
  subject: Subjects.CompanySrvUpdateCompanySuccess =
    Subjects.CompanySrvUpdateCompanySuccess;
}

export { UpdateCompanySuccessPublisher };
