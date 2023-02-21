import { Subjects } from "./subjects";

interface AccountCreationFailureEvent {
  subject: Subjects.AcocuntCreationFailure;
  data: {
    userId: string;
  };
}

export { AccountCreationFailureEvent };
