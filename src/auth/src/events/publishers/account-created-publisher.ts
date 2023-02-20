import { AccountCreatedEvent, Publisher, Subjects } from "@gdvn-longdp/common";

class AccountCreatedPublisher extends Publisher<AccountCreatedEvent> {
  subject: Subjects.AccountCreated = Subjects.AccountCreated;
}

export { AccountCreatedPublisher };
