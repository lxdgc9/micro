import {
  Publisher,
  Subjects,
  UserCreationSuccessEvent,
} from "@gdvn-longdp/common";

class UserCreationSuccessPublisher extends Publisher<UserCreationSuccessEvent> {
  subject: Subjects.UserCreationSuccess = Subjects.UserCreationSuccess;
}

export { UserCreationSuccessPublisher };
