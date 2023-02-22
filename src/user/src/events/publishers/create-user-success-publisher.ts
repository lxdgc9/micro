import {
  CreateUserSuccessEvent,
  Publisher,
  Subjects,
} from "@gdvn-longdp/common";

class CreateUserSuccessPublisher extends Publisher<CreateUserSuccessEvent> {
  subject: Subjects.UserSrvCreateUserSuccess =
    Subjects.UserSrvCreateUserSuccess;
}

export { CreateUserSuccessPublisher };
