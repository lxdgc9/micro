import { Subjects } from "./types/subjects";

interface AccountCreatedEvent {
  subject: Subjects.AccountCreated;
  data: {
    accountId: string;
    userId: string;
    key: string;
  };
}

export { AccountCreatedEvent };
