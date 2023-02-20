import { Subjects } from "./types/subjects";

interface AccountCreatedEvent {
  subject: Subjects.AccountCreated;
  data: {
    id: string;
    userId: string;
    key: string;
    type: string;
  }
}

export { AccountCreatedEvent };
