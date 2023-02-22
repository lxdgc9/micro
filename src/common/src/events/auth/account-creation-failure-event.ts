import { Subjects } from "../subjects";

interface AccountCreationFailureEvent {
  subject: Subjects.AuthServiceAccountCreationFailure;
  data: {
    userId: string;
  };
}

export { AccountCreationFailureEvent };
