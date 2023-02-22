import {
  DepartmentCreationSuccessEvent,
  Publisher,
  Subjects,
} from "@gdvn-longdp/common";

class DepartmentCreationSuccessPublisher extends Publisher<DepartmentCreationSuccessEvent> {
  subject: Subjects.CompanyServiceDepartmentCreationSuccess =
    Subjects.CompanyServiceDepartmentCreationSuccess;
}

export { DepartmentCreationSuccessPublisher };
