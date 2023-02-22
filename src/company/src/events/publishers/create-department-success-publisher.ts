import {
  CreateDepartmentSuccessEvent,
  Publisher,
  Subjects,
} from "@gdvn-longdp/common";

class CreateDepartmentSuccessPublisher extends Publisher<CreateDepartmentSuccessEvent> {
  subject: Subjects.CompanySrvCreateDepartmentSuccess =
    Subjects.CompanySrvCreateDepartmentSuccess;
}

export { CreateDepartmentSuccessPublisher };
