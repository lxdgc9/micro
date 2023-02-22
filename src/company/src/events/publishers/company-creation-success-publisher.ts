import {
  CompanyCreationSuccessEvent,
  Publisher,
  Subjects,
} from "@gdvn-longdp/common";

class CompanyCreationSuccessPublisher extends Publisher<CompanyCreationSuccessEvent> {
  subject: Subjects.CompanyServiceCompanyCreationSuccess =
    Subjects.CompanyServiceCompanyCreationSuccess;
}

export { CompanyCreationSuccessPublisher };
