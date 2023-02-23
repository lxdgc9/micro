import {
  Publisher,
  Subjects,
  UpdateAllowanceSuccessEvent,
} from "@gdvn-longdp/common";

class UpdateAllowanceSuccessPublisher extends Publisher<UpdateAllowanceSuccessEvent> {
  subject: Subjects.AllowanceSrvUpdateAllowanceSuccess =
    Subjects.AllowanceSrvUpdateAllowanceSuccess;
}

export { UpdateAllowanceSuccessPublisher };
