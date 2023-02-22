import { Subjects } from "../subjects";

interface CreateAccountFailureEvent {
  subject: Subjects.AuthSrvCreateAccountFailure;
  data: {
    userId: string;
  };
}

export { CreateAccountFailureEvent };
