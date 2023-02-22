import {
  Publisher,
  Subjects,
  UpdateDepartmentSuccessEvent,
} from "@gdvn-longdp/common";

class UpdateDepartmentSuccessPublisher extends Publisher<UpdateDepartmentSuccessEvent> {
  subject: Subjects.CompanySrvUpdateDepartmentSuccess =
    Subjects.CompanySrvUpdateDepartmentSuccess;
}

export { UpdateDepartmentSuccessPublisher };
