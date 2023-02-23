import {
  CreateAllowanceSuccessEvent,
  Publisher,
  Subjects,
} from "@gdvn-longdp/common";

class CreateAllowanceSuccessPublisher extends Publisher<CreateAllowanceSuccessEvent> {
  subject: Subjects.AllowanceSrvCreateAllowanceSuccess =
    Subjects.AllowanceSrvCreateAllowanceSuccess;
}

export { CreateAllowanceSuccessPublisher };
