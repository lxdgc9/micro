import {
  CreateAccountFailureEvent,
  Publisher,
  Subjects,
} from "@gdvn-longdp/common";

class CreateAccountFailurePublisher extends Publisher<CreateAccountFailureEvent> {
  subject: Subjects.AuthSrvCreateAccountFailure =
    Subjects.AuthSrvCreateAccountFailure;
}

export { CreateAccountFailurePublisher };
