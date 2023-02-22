import {
  AccountCreationFailureEvent,
  Publisher,
  Subjects,
} from "@gdvn-longdp/common";

class AccountCreationFailurePublisher extends Publisher<AccountCreationFailureEvent> {
  subject: Subjects.AuthServiceAccountCreationFailure =
    Subjects.AuthServiceAccountCreationFailure;
}

export { AccountCreationFailurePublisher };
