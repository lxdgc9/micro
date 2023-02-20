import { Publisher, Subjects, UserCreatedEvent } from "@gdvn-longdp/common";

class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}

export { UserCreatedPublisher };
